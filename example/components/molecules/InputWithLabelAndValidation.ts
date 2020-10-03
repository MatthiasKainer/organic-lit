import { html } from "lit-html";
import { pureLit, LitElementWithProps } from "pure-lit";
import {
  FormElementHoromoneValue,
  InputProps,
  ReceptorProps,
  ReleaseProps,
  ValidationProps,
} from "../types";

import "../atoms";
import { css } from "lit-element";

export const InputWithLabelAndValidation = pureLit(
  "molecule-input-with-label-and-validation",
  (
    element: LitElementWithProps<
      InputProps &
        ValidationProps &
        ReleaseProps<FormElementHoromoneValue> &
        ReceptorProps<FormElementHoromoneValue>
    >
  ) => {
    const form = element.form || "form";

    return html`
      <label class="${element.isValid ? "" : "invalid"}">
        <div>${element.label}</div>
        <div>
          <component-atom-input
            form=${form}
            name="${element.name}"
            label="${element.label}"
            placeholder="${element.placeholder}"
            .isValid=${element.isValid}
            .clear=${element.clear}
            .release=${element.release}
            .receptor=${element.receptor}
          ></component-atom-input>
        </div>
      </label>
    `;
  },
  {
    styles: css`
      label {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .invalid {
        color: var(--alert-color);
      }
    `,
    defaults: {
      name: "input",
      label: "input",
      placeholder: "insert value",
      clear: false,
      isValid: true,
      form: undefined,
      release: undefined,
      receptor: undefined,
    },
  }
);
