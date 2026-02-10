import MainContainer from "../components/MainContainer"
import MobileContainer from "../components/MobileContainer"
import Button from "../components/buttons/Button"
import Heading from "../components/text/Heading"
import TextInput from "../components/form/TextInput"
import UserBubble from "../components/UserBubble"

function Group() {
    return (
        <MainContainer>
            <MobileContainer variant="normal">
                <div id="group-header" className="flex h-fit p-3 w-full">
                    <div className="flex flex-col w-full">
                        <p>groupName</p>
                        <p>memberCount Members</p>
                    </div>
                    <div className="w-full">
                        <button>+</button>
                    </div>
                </div>

                <div id="members-list" className="flex justify-evenly h-fit p-3 w-full">
                    <UserBubble/>
                    <UserBubble/>
                    <UserBubble/>
                    <UserBubble/>
                </div>
            </MobileContainer>
        </MainContainer>
    )
}

export default Group