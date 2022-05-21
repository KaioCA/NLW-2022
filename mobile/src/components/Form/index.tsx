import * as FileSystem from 'expo-file-system'

import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';

import { ArrowLeft } from 'phosphor-react-native';
import { Button } from '../../components/Button'
import { FeedbackType } from '../../components/Widget'
import { ScreenshotButton } from '../../components/ScreenshotButton'
import { api } from '../../libs/api';
import { captureScreen } from 'react-native-view-shot'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { styles } from './styles';
import { theme } from '../../theme';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export const feedbackTypesPlaceholders = {
  BUG: "Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...",
  IDEA: "Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!",
  OTHER: "Queremos te ouvir. O que você gostaria de nos dizer? ",
};

export default function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {

  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const { title, image } = feedbackTypes[feedbackType];

  const placeholder = feedbackTypesPlaceholders[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
      .then((screenshot) => setScreenshot(screenshot))
      .catch(error => console.log(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }


    try {

      setIsSendingFeedback(true)
      const screenshotBase64 = screenshot && (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }))

      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: screenshot && `data:image/png;base64,${screenshotBase64}`,
        comment
      })

      setIsSendingFeedback(false);

      onFeedbackSent();

    } catch (error) {
      console.log(error)
      setIsSendingFeedback(false)
    }

  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>

          <Image
            source={image}
            style={styles.image}
          />

          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>

      </View>

      <TextInput
        multiline={true}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={text => setComment(text)}
        value={comment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
          disabled={!comment || isSendingFeedback}
        >
          <Text style={styles.buttonTitle}>Enviar Feedback</Text>
        </Button>
      </View>

    </View>
  );
}