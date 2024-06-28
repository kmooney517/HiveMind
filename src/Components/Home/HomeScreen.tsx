// src/Games/HomeScreen.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGuesses } from '@wordle/WordleUtils/fetchUserGuesses';
import { getProfile } from '@profile/profileHelpers'; // Import the profile helper function
import { SafeAreaView } from 'react-native';
import {
    Container,
    Header,
    WelcomeText,
    ButtonRow,
    Button,
    ButtonText,
    PlayButton,
    ViewScoresButton,
} from './StyledHome';
import { performSignOut } from '@redux/authSlice'; // Import the performSignOut function
import { RootState } from '@redux/store';
import TopNavbar from '../TopNavbar'; // Import the TopNavbar component

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const hive = useSelector((state: RootState) => state.hive);
    const profile = useSelector((state: RootState) => state.profile);
    const [completedToday, setCompletedToday] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [profileFetched, setProfileFetched] = useState<boolean>(false);

    const loadGuesses = useCallback(async () => {
        if (user?.id && hive?.id) {
            const { todayCompleted } = await fetchUserGuesses(
                new Date().toISOString().split('T')[0],
                user?.id,
                hive?.id,
            );
            setCompletedToday(todayCompleted);
        }
    }, [user?.id, hive?.id]);

    useFocusEffect(
        useCallback(() => {
            loadGuesses();
        }, [loadGuesses]),
    );

    useEffect(() => {
        if (user?.id) {
            setLoading(true);
            getProfile(user.id, dispatch).then(() => {
                setProfileFetched(true);
                setLoading(false);
            });
        }
    }, [user?.id, dispatch]);

    useEffect(() => {
        if (profileFetched && !profile.name) {
            navigation.navigate('Profile', { forceRedirect: true });
        }
    }, [profile, profileFetched, navigation]);

    const handleSignOut = () => {
        dispatch(performSignOut()); // Use performSignOut to handle the sign-out process
    };

    if (loading) {
        return (
            <Container>
                <Header>
                    <WelcomeText>Loading...</WelcomeText>
                </Header>
            </Container>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar navigation={navigation} />
            <Container>
                <ButtonRow>
                    <Button
                        onPress={() => navigation.navigate('HiveView')}
                        disabled={!profile.id}
                        style={{
                            backgroundColor: !profile.id ? '#B0C4DE' : '#007AFF',
                        }}>
                        <ButtonText>
                            {hive.id ? 'View Hive Details' : 'Join or Create Hive'}
                        </ButtonText>
                    </Button>
                    <PlayButton
                        onPress={() => navigation.navigate('Wordle')}
                        disabled={!hive.id}
                        style={{
                            backgroundColor: !hive.id ? '#B0C4DE' : '#007AFF',
                        }}>
                        <ButtonText>Play Wordle</ButtonText>
                    </PlayButton>
                    <ViewScoresButton
                        onPress={() => navigation.navigate('WordleGuesses')}
                        disabled={!hive.id || !completedToday}
                        style={{
                            backgroundColor:
                                !hive.id || !completedToday ? '#B0C4DE' : '#007AFF',
                        }}>
                        <ButtonText>View Today’s Scores</ButtonText>
                    </ViewScoresButton>
                </ButtonRow>
            </Container>
        </SafeAreaView>
    );
};

export default HomeScreen;