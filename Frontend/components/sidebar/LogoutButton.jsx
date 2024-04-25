import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	// const { loading, logout } = useLogout();

	return (
		<div className='mt-auto p-2'>
        <BiLogOut className='w-6 h-6 top-2 text-white cursor-pointer' />

		</div>
	);
};
export default LogoutButton;
