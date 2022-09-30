import React from "react";
import FastImage from "react-native-fast-image";
import { Box, HStack, Button } from "native-base";
import { styles, nbStyles } from "./styles";
// import { CategoryCardProps } from "../../config";
import { CheckCircle, UncheckCircle } from "./assets";

type CategoryCardProps = {
  id: string;
  title: string;
  image?: string;
  color: boolean;
  status?: boolean;
  selectedCategories: string[];
  setSelectedCategories: any;
};

const TestingCard = ({
  id,
  title,
  image,
  color,
  selectedCategories,
  setSelectedCategories,
}: CategoryCardProps) => {
  const onCategoryPress =  (id: string)  => {
    selectedCategories.includes(id)
      ? setSelectedCategories(selectedCategories.filter((cat) => cat !== id))
      : setSelectedCategories([...selectedCategories, id]);
  };

  return (
    <Box
      {...nbStyles.categoryContainer}
      borderColor={
        selectedCategories.includes(id) ? "white.100" : "transparent"
      }
    >
      {image?<FastImage
        source={{uri:image}}
        style={styles.image}
        // imageStyle={styles.bgImage}
        resizeMode={FastImage.resizeMode.cover}
      />:null}
      <Box
        w="100%"
        h="100%"
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        bg={color?'white':'red'}
        borderRadius={10}
        opacity="0.2"
      />

      <Button
        flex={1}
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        variant="unstyled"
        _pressed={{
          bg: "transparent",
        }}
        onPress={() => onCategoryPress(id)}
      >
        <HStack justifyContent="space-between" alignItems="center" zIndex={1}>
          <Box width="10%">
            {selectedCategories.includes(id) ? (
              <CheckCircle />
            ) : (
              <UncheckCircle />
            )}
          </Box>
          <Box
            width="80%"
            alignItems="center"
            _text={{
              ...nbStyles.categoryText,
              color: "white.100",
              textTransform: "uppercase",
              opacity: 1,
              zIndex: 1,
            }}
          >
            {title}
          </Box>
          <Box width="10%" />
        </HStack>
      </Button>
    </Box>
  );
};

export default TestingCard;