import React, { Component } from 'react'
import { Card, Table, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EditUser from './UserView';
import GetUser from 'services/GetUsers';
import Loading from 'components/shared-components/Loading';

export class UserList extends Component {

	state = {
		users: null,
		userProfileVisible: false,
		selectedUser: null,
		isLoading: true
	}

	addUsers = users => {
		this.setState({ users, isLoading: false })
	};

	deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};

	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
		});
	}

	componentDidMount() {
		GetUser()
			.then(data => this.addUsers(data))
			.catch(error => console.log(error));
	}

	render() {
		const { users, userProfileVisible, selectedUser, isLoading } = this.state;

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus name={record.name} subTitle={record.email} />
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Phone',
				dataIndex: 'phone'
			},
			{
				title: 'Website',
				dataIndex: 'website',
				sorter: {
					compare: (a, b) => a.username.length - b.username.length,
				},
			},
			{
				title: 'User Name',
				dataIndex: 'username',
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { this.showUserProfile(elm) }} size="small" />
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={() => { this.deleteUser(elm.id) }} size="small" />
						</Tooltip>
					</div>
				)
			}
		];

		return (
			<>
				{isLoading ? <Loading /> :
					(
						<Card bodyStyle={{ 'padding': '0px' }}>
							<Table columns={tableColumns} dataSource={users} rowKey='id' />
							<EditUser data={selectedUser} visible={userProfileVisible} close={() => { this.closeUserProfile() }} />
						</Card>
					)}
			</>

		)
	}
}

export default UserList
