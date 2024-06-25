import {createClient, SupabaseClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import {store} from '@redux/store';

const supabaseUrl = 'https://xkftmbmzonnhginbluci.supabase.co'; // Replace with your Supabase project URL
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnRtYm16b25uaGdpbmJsdWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNjI0NjMsImV4cCI6MjAzNDgzODQ2M30.NcpuP2P8cojcYU_CnTVvGe8ABywn6YVggo_Sh33UTE4'; // Replace with your Supabase anon key

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export const setSupabaseAuthSession = async (
	session: {access_token: string; refresh_token: string} | null,
) => {
	if (session) {
		await supabase.auth.setSession(
			session.access_token,
			session.refresh_token,
		);
	} else {
		await supabase.auth.signOut();
	}
};

export const getSupabaseClient = () => {
	const state = store.getState();
	const token = state.auth.token;

	if (token) {
		supabase.auth.setSession(token.access_token, token.refresh_token);
	}

	return supabase;
};

export default supabase;
