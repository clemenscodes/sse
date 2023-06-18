// import { getSession } from '@utils';
// import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@pages').then((mod) => mod.Login));

// export const getServerSideProps: GetServerSideProps = async () => {
//     const session = await getSession();
//     return {
//         props: {
//             session,
//         },
//     };
// };

export default Login;
