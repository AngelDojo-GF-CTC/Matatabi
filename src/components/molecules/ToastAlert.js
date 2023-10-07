import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useSetRecoilState } from "recoil";
import { isToastOpenState, toastDetailsState } from "../../recoil/atoms";

export const ToastAlert = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable,
}) => {
  const setIsToastOpen = useSetRecoilState(isToastOpenState);
  const setToastDetails = useSetRecoilState(toastDetailsState);
  const toast = useToast();
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === "solid"
                  ? "lightText"
                  : variant !== "outline"
                  ? "darkText"
                  : null
              }
            >
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === "solid" ? "lightText" : "darkText",
              }}
              onPress={() => {
                toast.close(id);
                setIsToastOpen(false);
                setToastDetails({
                  id: undefined,
                  title: undefined,
                  status: undefined,
                  variant: undefined,
                  description: undefined,
                  isClosable: undefined,
                });
              }}
            />
          ) : null}
        </HStack>
        <Text
          px="6"
          color={
            variant === "solid"
              ? "lightText"
              : variant !== "outline"
              ? "darkText"
              : null
          }
        >
          {description}
        </Text>
      </VStack>
    </Alert>
  );
};
