export const getBorderColor = (member, worstPlayer, allCompleted) => {
	if (member.user_id === worstPlayer?.user_id && allCompleted) {
		return 'red';
	}
	if (member.completedToday) {
		return 'green';
	}
	return 'yellow';
};
