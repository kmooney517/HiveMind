// src/components/TopNavbar.tsx
import React, {useState} from 'react';
import {Modal, Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {performSignOut} from '@redux/authSlice';

const TopNavbar: React.FC<{navigation: any}> = ({navigation}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const userEmail = useSelector((state: RootState) => state.auth.user?.email);
	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(performSignOut());
		setModalVisible(false);
	};

	const handleProfileView = () => {
		setModalVisible(false);
		navigation.navigate('Profile');
	};

	return (
		<NavbarContainer>
			<Title>HiveMind</Title>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<EmailText>{userEmail} ▾</EmailText>
			</TouchableOpacity>
			<Modal
				visible={modalVisible}
				transparent={true}
				onRequestClose={() => setModalVisible(false)}>
				<ModalContainer>
					<ModalContent>
						<Button title="Profile" onPress={handleProfileView} />
						<Button title="Logout" onPress={handleSignOut} />
						<Button
							title="Close"
							onPress={() => setModalVisible(false)}
						/>
					</ModalContent>
				</ModalContainer>
			</Modal>
		</NavbarContainer>
	);
};

const NavbarContainer = styled.View`
	height: 60px;
	background-color: #4b9ce2;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	padding-horizontal: 20px;
`;

const Title = styled.Text`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
`;

const EmailText = styled.Text`
	color: #fff;
	font-size: 16px;
`;

const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
	width: 300px;
	padding: 20px;
	background-color: #fff;
	border-radius: 10px;
	align-items: center;
`;

export default TopNavbar;
