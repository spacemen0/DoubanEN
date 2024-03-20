export default function Loading() {
    return (
        <div
            className="inline-block h-8 w-8 rounded-full bg-current opacity-0 animate-[spinner-grow_0.75s_linear_infinite] align-[-0.125em] text-surface motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] dark:text-white"
            role="status"
        >
          <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
    )
}