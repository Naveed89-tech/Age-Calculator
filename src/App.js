import React, { useState } from "react";

import Icons from "./component/Icons";
import { useFormik } from "formik";
function App() {
  const [year, setYear] = useState("--");
  const [months, setMonths] = useState("--");
  const [days, setDays] = useState("--");
  const date = new Date();
  let currentYear = date.getFullYear();
  // month index start from 0
  let currentMonth = date.getMonth() + 1;
  let currentDate = date.getDate();
  let monthTotalDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const validate = (values) => {
    const errors = {};
    if (!values.date) {
      errors.date = "This field is required";
    } else if (values.date <= 0 || values.date > 31) {
      errors.date = "valid date required";
    } else if (
      values.year === currentYear &&
      values.month === currentMonth &&
      values.date >= currentDate
    ) {
      errors.date = "valid date required";
    }
    if (!values.month) {
      errors.month = "This field is required";
    } else if (values.month <= 0 || values.month > 12) {
      errors.month = "valid month required";
    } else if (values.year === currentYear && values.month > currentMonth) {
      errors.month = "valid month required";
    }
    if (!values.year) {
      errors.year = "This field is required";
    } else if (values.year.toString().length !== 4) {
      errors.year = "Valid Year required";
    } else if (values.year > currentYear) {
      errors.year = "Valid Year required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      month: "",
      year: "",
      isValid: true,
    },

    validate,
    onSubmit: (values) => {
      if (values.date > currentDate) {
        currentDate = currentDate + monthTotalDays[currentMonth - 1];
        currentMonth = currentMonth - 1;
        // (d2 = d2 + month[m2 - 1]);
      }
      // m1 entered values
      // y1 enteredf values
      if (values.month > currentMonth) {
        currentMonth = currentMonth + 12;
        currentYear = currentYear - 1;
      }

      setYear(currentYear - values.year);
      setMonths(currentMonth - values.month);
      setDays(currentDate - values.date);
    },
  });

  return (
    <div class="flex h-screen flex-col md:p-8 sm:p-6 p-4 items-center justify-center container my-0 mx-auto  font-['Poppins']">
      <div class="flex flex-col md:gap-4  gap-2 rounded-2xl rounded-br-xl  bg-white md:p-8 p-6 drop-shadow-lg">
        <form onSubmit={formik.handleSubmit}>
          <div class="flex  items-center justify-center md:gap-3 gap-2">
            <div>
              <label
                htmlFor="date"
                class={`label ${formik.errors.date && "text-red-300"}`}
              >
                DAY
              </label>
              <div class="mt-2.5">
                <input
                  type="number"
                  name="date"
                  id="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                  placeholder="DD"
                  autoComplete="given-name"
                  class={`input ${
                    formik.errors.date && formik.touched.date
                      ? "ring-red-300"
                      : null
                  }`}
                />
                {formik.touched.date && formik.errors.date ? (
                  <p class="error">{formik.errors.date}</p>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="month"
                class={`label ${formik.errors.month && "text-red-300"}`}
              >
                MONTH
              </label>
              <div class="mt-2.5">
                <input
                  type="number"
                  name="month"
                  id="month"
                  placeholder="MM"
                  autoComplete="month"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month}
                  class={`input ${
                    formik.errors.month && formik.touched.month
                      ? "ring-red-300"
                      : null
                  }`}
                />
                <div>
                  {formik.touched.month && formik.errors.month ? (
                    <p class="error">{formik.errors.month}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="year"
                class={`label ${formik.errors.year && "text-red-300"}`}
              >
                YEAR
              </label>
              <div class="mt-2.5">
                <input
                  type="number"
                  name="year"
                  id="year"
                  placeholder="YYYY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                  autoComplete="given-name"
                  class={`input ${
                    formik.errors.year && formik.touched.year
                      ? "ring-red-300"
                      : null
                  }`}
                />
              </div>
              {formik.touched.year && formik.errors.year ? (
                <p class="error">{formik.errors.year}</p>
              ) : null}
            </div>
          </div>
          {/* button */}
          <div class="sm:flex items-center justify-between relative sm:mt-4 my-12">
            <div class="w-full border border-solid border-gray-200 text-red-600 "></div>
            <div class="sm:relative absolute sm:top-0 -top-1/2 sm:left-0   left-1/2 sm:-translate-x-0 -translate-x-1/2 sm:translate-y-0 -translate-y-1/2">
              <button
                type="submit"
                class="rounded-full border bg-violet-600 p-4 hover:bg-gray-950 "
              >
                <Icons />
              </button>
            </div>
          </div>
        </form>
        {/* results  */}
        <div class="flex flex-col gap-2  ">
          <div>
            <span class="count-number">{year}</span>
            <span class="count-text">{"years"}</span>
          </div>
          <div>
            <span class="count-number">{months}</span>
            <span class="count-text">{"months"}</span>
          </div>
          <div>
            <span class="count-number">{days}</span>
            <span class="count-text">{"days"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
