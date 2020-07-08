import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Layout, Menu, Breadcrumb, List, Input } from 'antd';

import HomePage from '../HomePage'

import { addTask as addTaskToDB, fetchTasks } from '../../utils/api'

import 'antd/dist/antd.css';
import './style.scss'

const { Header, Content, Footer } = Layout;

function BasePage(props) {

    const [data, setData] = useState([])
    const user = (
        props.user
        || { email: "harsh51000@gmail.com" }
    )

    const addTask = (e, setter) => {
        if (e.key === 'Enter') {
            setData([e.target.value].concat(data))
            if (user === undefined) {
                localStorage.setItem("tasks", JSON.stringify([e.target.value].concat(data)))
            }
            else {
                addTaskToDB(e.target.value, user.email)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            }
            setter("")
        }
    }

    const [newTaskInput, setNewTaskInput] = useState("")
    const onChange = (e, setter) => setter(e.target.value)

    useEffect(() => {
        if (user === undefined) {
            if (Array.isArray(JSON.parse(localStorage.getItem("tasks"))) === false) {
                localStorage.setItem("tasks",
                    JSON.stringify([
                        'Racing car sprays burning fuel into crowd.',
                        'Japanese princess to wed commoner.',
                        'Australian walks 100km after outback crash.',
                        'Man charged over missing wedding girl.',
                        'Los Angeles battles huge wildfires.',
                    ]))
                setData(JSON.parse(localStorage.getItem("tasks")))
            }
            else {
                setData(JSON.parse(localStorage.getItem("tasks")))
            }
        }
        else {
            fetchTasks(user.email)
                .then((res) => {
                    const tasks = res.data.data.tasks.map(obj => obj.task)
                    setData(tasks)
                })
                .catch((err) => console.log(err))
        }
    }, [])

    return (
        <Layout className="layout">
            <Header>
                <div className="logo">
                    <h3>TASKS</h3>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">About Us</Menu.Item>
                    <Menu.Item key="3">Contact Us</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">

                    <List
                        size="small"
                        header={
                            <Input
                                className="new-task-input"
                                placeholder="Add a Task"
                                value={newTaskInput}
                                onChange={(e) => onChange(e, setNewTaskInput)}
                                onKeyDown={(e) => addTask(e, setNewTaskInput)}
                            />
                        }
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Tasks ©2020 Created by Harsh Agrawal</Footer>
        </Layout>
        // <Switch>
        //     <Route exact path='/' component={() => <HomePage />} />
        // </Switch>
    )
}

export default BasePage
