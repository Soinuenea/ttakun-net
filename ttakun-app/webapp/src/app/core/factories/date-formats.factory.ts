import { TranslationService } from '../services/translation.service';

export const createDateFormats = (translationService: TranslationService) => {
  const translations = translationService.getTranslationSync('datePicker.formats');

  return {
    parseInput: translations.parseInput,
    fullPickerInput: translations.fullPickerInput,
    datePickerInput: translations.datePickerInput,
    timePickerInput: translations.timePickerInput,
    monthYearLabel: translations.monthYearLabel,
    dateA11yLabel: translations.dateA11yLabel,
    monthYearA11yLabel: translations.monthYearA11yLabel
  };
};
