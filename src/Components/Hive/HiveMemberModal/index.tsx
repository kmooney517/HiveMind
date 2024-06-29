// src/components/MemberModal.tsx
import React from 'react';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import Grid from '../HiveGrid/Grid';
import {
	ModalContainer,
	ModalContent,
	HiveMembersTitle,
} from '../StyledHiveView';

const HiveMemberModal = ({modalVisible, setModalVisible, selectedMember}) => (
	<Modal
		visible={modalVisible}
		transparent={true}
		onRequestClose={() => setModalVisible(false)}>
		<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
			<ModalContainer>
				<TouchableWithoutFeedback>
					<ModalContent>
						{selectedMember && (
							<>
								<HiveMembersTitle>
									{selectedMember.name}'s Guesses
								</HiveMembersTitle>
								<Grid guesses={selectedMember.guessData} />
							</>
						)}
					</ModalContent>
				</TouchableWithoutFeedback>
			</ModalContainer>
		</TouchableWithoutFeedback>
	</Modal>
);

export default HiveMemberModal;
