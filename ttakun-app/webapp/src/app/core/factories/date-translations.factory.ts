import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { TranslationService } from '../services/translation.service';

class DateTranslations extends OwlDateTimeIntl {
  constructor(
    public upSecondLabel: string,
    public downSecondLabel: string,
    public upMinuteLabel: string,
    public downMinuteLabel: string,
    public upHourLabel: string,
    public downHourLabel: string,
    public prevMonthLabel: string,
    public nextMonthLabel: string,
    public prevYearLabel: string,
    public nextYearLabel: string,
    public prevMultiYearLabel: string,
    public nextMultiYearLabel: string,
    public switchToMonthViewLabel: string,
    public switchToMultiYearViewLabel: string,
    public cancelBtnLabel: string,
    public setBtnLabel: string,
    public rangeFromLabel: string,
    public rangeToLabel: string,
    public hour12AMLabel: string,
    public hour12PMLabel: string,
  ) {
    super();
  }
}

export const createDateTranslations = (translationService: TranslationService) => {
  const translations = translationService.getTranslationSync('datePicker.labels');

  return new DateTranslations(
    translations.upSecondLabel,
    translations.downSecondLabel,
    translations.upMinuteLabel,
    translations.downMinuteLabel,
    translations.upHourLabel,
    translations.downHourLabel,
    translations.prevMonthLabel,
    translations.nextMonthLabel,
    translations.prevYearLabel,
    translations.nextYearLabel,
    null,
    null,
    translations.switchToMonthViewLabel,
    translations.switchToYearViewLabel,
    translations.cancelBtnLabel,
    translations.setBtnLabel,
    translations.rangeFromLabel,
    translations.rangeToLabel,
    null,
    null
  );
};
