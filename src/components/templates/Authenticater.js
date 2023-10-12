import React, { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react-native";
import awsconfig from "../../aws-exports";
import { useSetRecoilState } from "recoil";
import { myUserIdState } from "../../recoil/atoms";
import { Auth } from "aws-amplify";

export const Authenticater = ({ children }) => {
  const setMyUserId = useSetRecoilState(myUserIdState);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user?.attributes?.sub) {
          setMyUserId(user.attributes.sub);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator
        loginMechanisms={awsconfig.aws_cognito_verification_mechanisms.map(
          (str) => str.toLowerCase()
        )}
        signUpAttributes={awsconfig.aws_cognito_signup_attributes.map((str) =>
          str.toLowerCase()
        )}
        usernameAttributes={awsconfig.aws_cognito_username_attributes.map(
          (str) => str.toLowerCase()
        )}
        socialProviders={awsconfig.aws_cognito_social_providers.map((str) =>
          str.toLowerCase()
        )}
        components={{
          SignUp: ({ fields, ...props }) => (
            <Authenticator.SignUp
              {...props}
              fields={[
                ...fields,
                {
                  name: "gender",
                  label: "性別",
                  type: "default",
                  placeholder: "性別を入力してください(MAN or WOMAN)",
                  required: true,
                },
              ]}
            />
          ),
        }}
      >
        {children}
      </Authenticator>
    </Authenticator.Provider>
  );
};
