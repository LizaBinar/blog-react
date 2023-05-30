export const handleFinishForForm = async (
  values,
  onFinish,
  setIsSubmitting
) => {
  setIsSubmitting(true);
  try {
    await onFinish(values);
  } catch (error) {
    console.log(error);
  } finally {
    setIsSubmitting(false);
  }
};
