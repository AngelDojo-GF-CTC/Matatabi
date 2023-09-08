import React from "react";
import { VStack, Button, AddIcon, Box } from "native-base";
import { color } from "../../styles/color";

export const TravelList = ({ handleAddFormMode }) => {
  return (
    <Box style={{ marginTop: 30 }}>
      <VStack space={2} alignItems="center">
        <Box style={{ width: "80%" }}>
          <Button
            startIcon={<AddIcon />}
            style={{ width: "100%", backgroundColor: color.add }}
            onPress={handleAddFormMode}
          >
            新しい旅の登録
          </Button>

          {/* TODO: 次の旅 */}
          {/* TODO: 過去の旅 */}
        </Box>
      </VStack>
    </Box>
  );
};
