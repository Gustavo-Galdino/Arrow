export function UserDataSession() {
  return (
    <section>
      <h2 className="border-b text-xl font-semibold">Dados</h2>

      <form className="flex items-center justify-between space-y-2">
        <div className="mt-4 w-full space-y-2">
          <div className="flex w-full items-center gap-1">
            <label htmlFor="">Peso:</label>
            <p>82 kg</p>
          </div>

          <div className="flex w-full items-center gap-1">
            <label htmlFor="">Altura:</label>
            <p>1,80 cm</p>
          </div>

          <div className="flex w-full items-center gap-1">
            <label htmlFor="">Idade:</label>
            <p>25</p>
          </div>

          <div className="flex w-full items-center gap-1">
            <label htmlFor="">Nivel de atividade:</label>
            <p>1.8</p>
          </div>
        </div>

        <div className="flex w-full items-center gap-1">
          <label htmlFor="">Taxa Basal:</label>
          <p>2000kcal</p>
        </div>
      </form>
    </section>
  )
}
