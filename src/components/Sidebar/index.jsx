import React from 'react'
import { Empty, Menu, Layout } from 'antd'

const { Sider } = Layout

const Sidebar = ({
    collapsed,
    shipments,
    onSelect,
    setCollapsed,
}) => {

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            className="site-layout-background"
            width={300}
        >
            <Menu
                mode="inline"
                style={{
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
                defaultSelectedKeys={['0']}
            >
                {shipments ? (
                    shipments?.map((item, i) => (
                        <Menu.Item onClick={() => onSelect(item)} key={i}>
                            {item.name}
                        </Menu.Item>
                    ))
                ) : (
                    <Empty style={{ margin: 20 }} />
                )}
            </Menu>
        </Sider>
    )
}

export default Sidebar
