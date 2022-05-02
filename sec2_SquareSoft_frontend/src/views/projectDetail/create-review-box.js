import {
  Button,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
  FormControl,
  Textarea,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createReview } from "../../api/project-detail/project-detail-api";

function CreateReviewBox({ projectID }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [star, setStar] = useState(0);

  const onClickSubmitReview = () => {
    if (text.length > 0) {
      setLoading(true);

      const response = createReview(projectID, star, text);

      response
        .then(() => {
          setLoading(false);
          alert("Your review has been sent.");
        })
        .catch((error) => {
          setLoading(false);

          let error_message = error.response.data["msg"];

          if (error.toJSON().status === 401) {
            alert("Please log in.");
          } else if (
            error_message === "the user has not donated this project"
          ) {
            alert("Please donate to this project first.");
          } else if (error_message === "project not found") {
            alert(
              "That project does not exist, please check for the project's ID"
            );
          } else if (
            error_message === "the user has already reviewed the project"
          ) {
            alert("You have already reviewed this project.");
          } else if (
            error_message === "review creation failed: database error"
          ) {
            alert(
              "Oops, there is something wrong on our side. Please try again."
            );
          } else alert(error_message);
        });
    } else alert("Please type your review.");
  };

  return (
    <Center>
      <VStack spacing={5} width="2xl">
        <FormControl id="text">
          <FormLabel htmlFor="text">Let's create your review</FormLabel>
          <Textarea
            borderColor="purple.500"
            focusBorderColor="lime"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="star">
          <FormLabel htmlFor="star">Star</FormLabel>
          <Slider
            colorScheme="purple"
            defaultValue={0}
            min={0}
            max={5}
            step={1}
            width="2xl"
            onChange={(val) => setStar(val)}
          >
            <SliderMark value={0} mt="1" ml="2.5" fontSize="sm">
              0
            </SliderMark>
            <SliderMark value={1} mt="1" ml="2.5" fontSize="sm">
              1
            </SliderMark>
            <SliderMark value={2} mt="1" ml="2.5" fontSize="sm">
              2
            </SliderMark>
            <SliderMark value={3} mt="1" ml="2.5" fontSize="sm">
              3
            </SliderMark>
            <SliderMark value={4} mt="1" ml="2.5" fontSize="sm">
              4
            </SliderMark>
            <SliderMark value={5} mt="1" ml="2.5" fontSize="sm">
              5
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>

        <Button
          isLoading={loading}
          loadingText="กำลังสร้างรีวิว"
          id="create-review"
          colorScheme="purple"
          variant="solid"
          w="200px"
          borderRadius="12px"
          onClick={onClickSubmitReview}
        >
          ส่งรีวิว
        </Button>
      </VStack>
    </Center>
  );
}

export default CreateReviewBox;
