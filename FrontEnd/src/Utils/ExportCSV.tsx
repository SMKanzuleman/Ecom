const ExportCSV = (data: any[], filename: string) => {

    if (!data || data.length == 0) {
        return
    }

    const Header = Object.keys(data[0]).join(",")

    const Rows = data.map((d: any) => {

        return Object.values(d).map((val: any) => `"${val}`).join(",")

    })

    const CSV_Content = [Header, ...Rows].join("\n")

    const blob = new Blob([CSV_Content], { type: "text/csv" })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")

    a.href = url

    a.download = `${filename}.csv`

    a.click()

}

export default ExportCSV