import React, {useState, useRef} from 'react';
import {
	Modal,
	Button,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {performSignOut} from '@redux/authSlice';

const TopNavbar: React.FC<{navigation: any}> = ({navigation}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
	const userEmail = useSelector((state: RootState) => state.auth.user?.email);
	const dispatch = useDispatch();
	const emailRef = useRef(null);

	const handleSignOut = () => {
		dispatch(performSignOut());
		setModalVisible(false);
	};

	const handleProfileView = () => {
		setModalVisible(false);
		navigation.navigate('Profile');
	};

	const handleEmailPress = () => {
		if (emailRef.current) {
			emailRef.current.measure((fx, fy, width, height, px, py) => {
				setModalPosition({top: py + height + 2, left: px});
				setModalVisible(true);
			});
		}
	};

	return (
		<NavbarContainer>
			<Title>HiveMind</Title>
			<TouchableOpacity ref={emailRef} onPress={handleEmailPress}>
				<EmailText>{userEmail} ▾</EmailText>
			</TouchableOpacity>
			<Modal
				visible={modalVisible}
				transparent={true}
				onRequestClose={() => setModalVisible(false)}>
				<TouchableWithoutFeedback
					onPress={() => setModalVisible(false)}>
					<ModalContainer>
						<TouchableWithoutFeedback>
							<ModalContent
								style={{
									top: modalPosition.top,
									left: modalPosition.left,
								}}>
								<Button
									title="Profile"
									onPress={handleProfileView}
								/>
								<Button
									title="Logout"
									onPress={handleSignOut}
								/>
							</ModalContent>
						</TouchableWithoutFeedback>
					</ModalContainer>
				</TouchableWithoutFeedback>
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
	padding: 10px 20px;
	background-color: #fff;
	border-radius: 10px;
	align-items: center;
	position: absolute;
`;

export default TopNavbar;
