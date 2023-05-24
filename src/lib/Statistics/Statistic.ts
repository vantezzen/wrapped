import Wrapped from "../Wrapped";

export default abstract class Statistic<StaticData> {
  constructor(protected wrapped: Wrapped) {}
  abstract calculateResult(): StaticData;
  abstract getDefaultValue(): StaticData;
}
