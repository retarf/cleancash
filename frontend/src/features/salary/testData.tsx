type Salary = {
    id: number;
    value: string;
};

const salary: Salary = {
    id: 1,
    value: "100.00",
};

export const salaries: Salary[] = [
    salary,
    {
        id: 2,
        value: "200.00",
    },
    {
        id: 3,
        value: "300.00",
    },
];
