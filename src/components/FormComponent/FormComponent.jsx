import { Wrapper, Heading, Input, Button, Label } from './FormComponent.styled';
import { useState } from 'react';
import css from './FormComponent.module.css';
// import { type } from '@testing-library/user-event/dist/type';
export const FormComponent = apiData => {
  const [dayForm, setDayForm] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [sliceData, setSliceData] = useState(null);
  // const [specialities, setSpecialities] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    ShowData();
  };
  const ShowData = () => {
    console.log('Show', dayForm);
    console.log('Show', subjects);
  };
  const specialities = apiData.apiData;
  // const resultSpeciality = () => {
  //   specialities.filter(spec => spec.dayForm === dayForm);
  // };
  console.log(specialities);
  const handleChange = evt => {
    const { value, type, checked } = evt.target;
    if (type === 'radio') {
      setDayForm(value);
    }
    if (checked && type === 'checkbox') {
      setSubjects(pre => [...pre, value]);
    } else {
      setSubjects(pre => {
        return [...pre.filter(skill => skill !== value)];
      });
    }
  };
  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
  const onSubmit = evt => {
    const userChoice = () => {
      const result = specialities.filter(
        speciality =>
          (speciality.dayForm =
            dayForm && arrayEquals(speciality.subjects, subjects) === true)
      );
      return result;
    };
    setSliceData(userChoice());
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Heading>Введіть дані</Heading>
        <Label>Форма Навчання</Label>
        <div className={css.formDay_container}>
          <Label className={css.formDay_label}>
            Денна
            <Input
              className={css.formDay_input}
              type="radio"
              checked={dayForm === 'denna'}
              name="day-form"
              value="denna"
              onChange={handleChange}
            />
          </Label>
          <Label className={css.formDay_label}>
            Заочна
            <Input
              className={css.formDay_input}
              type="radio"
              checked={dayForm === 'zaochna'}
              name="day-form"
              value="zaochna"
              onChange={handleChange}
            />
          </Label>
        </div>
        <Label>Які предмети складали?</Label>
        <Label>
          Математика
          <Input
            type="checkbox"
            name="subjects"
            value="Math"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Історія України
          <Input
            type="checkbox"
            name="subjects"
            onChange={handleChange}
            value="History"
          />
        </Label>
        <Label>
          Фізика
          <Input
            type="checkbox"
            name="subjects"
            value="Physics"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Англійська мова
          <Input
            type="checkbox"
            name="subjects"
            value="English"
            onChange={handleChange}
          />
        </Label>
        <Button type="submit" onClick={onSubmit}>
          Sign up as
        </Button>
      </form>
      <h2>Ваш вибір</h2>
      {sliceData && (
        <ul>
          {sliceData.map(({ name, dayForm, subjects, id }) => {
            return <li key={id}>{name}</li>;
          })}
        </ul>
      )}
    </Wrapper>
  );
};
