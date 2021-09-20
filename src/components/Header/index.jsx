import './styles.scss'
import React from 'react'
import { AutoComplete, Input, Button } from 'antd'

const Header = ({ options, getShipment, onSelect, onSave }) => {
    return (
        <div class="header">
            <a href="/" class="logo">
                Cargo App
            </a>
            <div class="header-right">
                <AutoComplete
                    style={{ width: 400 }}
                    options={options}
                    onSelect={(e, o) => onSelect(o)}
                    filterOption={(inputValue, option) =>
                        option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                >
                    <Input.Search placeholder="input here" enterButton />
                </AutoComplete>
                <div className="btns">
                    <Button onClick={getShipment} className="btn">
                        Load
                    </Button>
                    <Button onClick={onSave} className="btn" type="primary">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header
