import { HomeContainer, HomeTitle } from "./styledComponents";
import LoginForm from "./components/LoginForm";
import InternalBox from "@/components/InternalBox";

export default function Home() {
	return (
		<HomeContainer>
			<InternalBox>
				<HomeTitle>Gjallarhorn Control</HomeTitle>
			</InternalBox>
			<InternalBox>
				<LoginForm />
			</InternalBox>
		</HomeContainer>
	);
}
