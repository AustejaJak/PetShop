export default function SelectMenuComponent({ options }) {
    return (
      <div>
        <select
          id="label"
          name="label"
          className="mt-2 block rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={options[0]}
        >
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}
        </select>
      </div>
    )
  }
  