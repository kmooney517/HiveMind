import React from 'react';
import {
	TopView,
	BackButton,
	HiveMembersTitle,
	LeaveButton,
} from './StyledHiveHeader';
interface HiveHeaderProps {
	navigation: any;
	hiveName: string;
	handleLeave: () => void;
}

export const HiveHeader: React.FC<HiveHeaderProps> = ({
	navigation,
	hiveName,
	handleLeave,
}) => {
	return (
		<TopView>
			<BackButton onPress={() => navigation.navigate('Home')}>
				<HiveMembersTitle>← {hiveName}</HiveMembersTitle>
			</BackButton>
			<LeaveButton title="Leave Hive" onPress={handleLeave} />
		</TopView>
	);
};
