import React from 'react';
import {UserText, GroupTitle} from './StyledWordleGuesses';

interface UserListProps {
	title: string;
	users: string[];
}

const UserList: React.FC<UserListProps> = ({title, users}) => (
	<div>
		<GroupTitle>{title}</GroupTitle>
		{users.map((user, index) => (
			<UserText key={index}>{user}</UserText>
		))}
	</div>
);

export default UserList;
