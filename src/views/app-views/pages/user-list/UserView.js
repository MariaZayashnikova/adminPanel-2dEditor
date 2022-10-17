import React, { Component } from 'react';
import { Form, Drawer, Button, Input, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';

export class EditUser extends Component {
	render() {
		const { data, visible, close } = this.props;

		const onFinish = values => {
			const key = 'updatable';
			message.loading({ content: 'Updating...', key });
			setTimeout(() => {
				this.setState({
					name: values.name,
					email: values.email,
					username: values.username,
					company: values.company,
					phoneNumber: values.phoneNumber,
					website: values.website,
					address: values.address,
					city: values.city,
					postcode: values.postcode,
				})
				message.success({ content: 'Done!', key, duration: 2 });
				close();
			}, 1000);
		};

		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo);
		};

		return (
			<>
				{data ? (
					<Drawer
						width={600}
						placement="right"
						onClose={close}
						closable={false}
						visible={visible}
					>
						<div className="mt-4">
							<UserOutlined style={{ fontSize: '42px' }} />
							<Form
								name="basicInformation"
								layout="vertical"
								initialValues={
									{
										'name': data.name,
										'email': data.email,
										'username': data.username,
										'company': data.company.name,
										'phoneNumber': data.phone,
										'website': data.website,
										'address': data.address.street,
										'city': data.address.city,
										'postcode': data.address.zipcode
									}
								}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
							>
								<Row>
									<Col xs={24} sm={24} md={24} lg={16}>
										<Row gutter={ROW_GUTTER}>
											<Col xs={24} sm={24} md={24}>
												<Form.Item
													label="Name"
													name="name"
													rules={[
														{
															required: true,
															message: 'Please input your name!',
														},
													]}
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={12}>
												<Form.Item
													label="Username"
													name="username"
													rules={[
														{
															required: true,
															message: 'Please input your username!'
														},
													]}
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={24}>
												<Form.Item
													label="Email"
													name="email"
													rules={[{
														required: true,
														type: 'email',
														message: 'Please enter a valid email!'
													}]}
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={24}>
												<Form.Item
													label="Phone Number"
													name="phoneNumber"
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={12}>
												<Form.Item
													label="Company"
													name="company"
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={12}>
												<Form.Item
													label="Website"
													name="website"
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={24}>
												<Form.Item
													label="Address"
													name="address"
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={12}>
												<Form.Item
													label="City"
													name="city"
												>
													<Input />
												</Form.Item>
											</Col>
											<Col xs={24} sm={24} md={12}>
												<Form.Item
													label="Post code"
													name="postcode"
												>
													<Input />
												</Form.Item>
											</Col>
										</Row>
										<Button type="primary" htmlType="submit">
											Save Change
										</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</Drawer>
				) : null}
			</>
		)
	}
}

export default EditUser
