import React from "react";
import C from "./style";

const PreloadScreen: React.FC = () => {
    return (
        <C.Container>
            <C.LoadingIcon color="#8863E6" size="large" />
        </C.Container>
    );
};

export default PreloadScreen;