import './styles.scss'

import { connect } from 'react-redux'
import { loadData } from '../../services'
import Header from '../../components/Header'
import { withRouter } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { useWindowDimensions, validate } from '../../helpers'
import React, { useEffect, useState } from 'react'
import { Button, Empty, Layout } from 'antd'
import { setShipments } from '../../store/root/actions'

const { Content } = Layout

const MainPage = (props) => {
    const width = useWindowDimensions().width

    const isMobile = width < 768

    const { shipments, history } = props

    const local_shipments = localStorage.getItem('shipments')

    const options = shipments?.map((s) => ({ ...s, value: s.name }))

    const [selected, setSelected] = useState(null)
    const [collapsed, setCollapsed] = useState(isMobile)
    const [error, setError] = useState(false)

    useEffect(() => {
        checkStatement()
    }, [])

    const checkStatement = async () => {
        if (local_shipments) {
            const parse = JSON.parse(local_shipments)
            props.setShipments(parse)
            setSelected(parse[0])
        }
    }

    const getShipment = async () => {
        const data = await loadData()
        props.setShipments(data)
        setSelected(data[0])
    }

    const calculationCargoBays = () => {
        const { boxes } = selected
        if (boxes) {
            const split_strings = boxes.split(',')
            const parse_strings = split_strings.map((n) => parseFloat(n, 10))
            const sum = parse_strings.reduce((a, b) => a + b)
            const remainder = sum / 10
            return sum % remainder > 0 ? ~~remainder + 1 : ~~remainder
        }
    }

    const onSave = () => {
        if (validate(selected.boxes)) {
            const index = shipments.findIndex((item) => item.id === selected.id)
            const modified = [...shipments]
            modified[index] = selected
            localStorage.setItem('shipments', JSON.stringify(modified))
            props.setShipments(modified)
        } else {
            setError(true)
        }
    }

    const onSelect = (val) => {
        setSelected({ ...val })
        history.push(`/${val.name}`)

        isMobile && setCollapsed(true)
    }

    const handleChangeInput = (val) => {
        setError(false)
        setSelected({ ...selected, boxes: val })
    }

    return (
        <>
            <Header
                options={options}
                getShipment={getShipment}
                onSelect={onSelect}
                onSave={onSave}
            />
            <Layout>
                <Content>
                    <Layout className="site-layout-background">
                        <Sidebar
                            shipments={shipments}
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                            onSelect={onSelect}
                        />
                        <Content className="company-details">
                            {selected ? (
                                <div className="company-details__selected">
                                    <h1>{selected.name}</h1>
                                    <p>
                                        <a>{selected.email}</a>
                                    </p>
                                    {selected.boxes ? (
                                        <span>
                                            Number of required cargo bays:{' '}
                                            <strong>
                                                {calculationCargoBays()}
                                            </strong>
                                        </span>
                                    ) : (
                                        <span>No boxes</span>
                                    )}
                                    <div className="boxes-field">
                                        <span class="boxes-field__cargo">
                                            Cargo boxes
                                        </span>

                                        <input
                                            pattern="^[0-9]*$"
                                            value={selected.boxes || ''}
                                            onChange={(e) =>
                                                handleChangeInput(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {error && (
                                            <span className="boxes-field__error">
                                                Incorrect value, should be e.g
                                                "1.2,10,2.2"
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="company-details__not-found">
                                    <Empty description={<span>No data</span>}>
                                        <Button
                                            onClick={getShipment}
                                            type="primary"
                                        >
                                            Load Now
                                        </Button>
                                    </Empty>
                                </div>
                            )}
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}

export default connect(
    (state) => ({
        shipments: state.data.shipments,
        loading: state.data.loading,
    }),
    { setShipments }
)(withRouter(MainPage))
