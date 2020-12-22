import { useCheckoutState, useCheckoutDispatch } from "../../context/checkout";

import { FormInput } from "../Form";

function ExtraFieldsForm() {
  const { extrafields } = useCheckoutState();
  const { setCurrentStep, nextStepFrom } = useCheckoutDispatch();

  if (extrafields.length === 0) setCurrentStep(nextStepFrom("extrafields"));

  return (
    <div className="md:flex md:space-x-12 lg:space-x-24">
      <div className="md:w-1/2">
        {extrafields.map(({ id, name, type }) => {
          const computedFieldName = `extrafields.${id}`;

          return (
            <FormInput
              key={id}
              id={computedFieldName}
              name={computedFieldName}
              label={name}
              type={type}
              placeholder={name}
            />
          );
        })}
        {/* <pre>{JSON.stringify(extrafields, null, 2)}</pre> */}
      </div>
    </div>
  );
}

export default ExtraFieldsForm;
