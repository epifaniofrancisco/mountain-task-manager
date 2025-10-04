import type { Task } from "@/lib/types";

export const mockTasks: Task[] = [
	{
		id: "1",
		title: "Preparar documentos para licença",
		description:
			"Reunir todos os documentos necessários para dar entrada na licença comercial",
		status: "done",
		priority: "high",
		dependencies: [],
		position: { x: 100, y: 100 },
	},
	{
		id: "2",
		title: "Implementar visualização por Flow",
		description:
			"Implementar a área de visualização por flow na aplicação",
		status: "done",
		priority: "high",
		dependencies: ["1"],
		position: { x: 400, y: 100 },
	},
	{
		id: "3",
		title: "Reunião com cliente na Maianga",
		description: "Apresentar proposta de serviços para novo cliente",
		status: "in-progress",
		priority: "high",
		dependencies: ["2"],
		position: { x: 700, y: 100 },
	},
	{
		id: "4",
		title: "Pagar conta de energia (ENDE)",
		description: "Ir à agência ENDE para regularizar a conta de energia",
		status: "in-progress",
		priority: "medium",
		dependencies: ["2"],
		position: { x: 400, y: 300 },
	},
	{
		id: "5",
		title: "Organizar festa de aniversário",
		description:
			"Planear festa de aniversário da família, reservar espaço e encomendar bolo",
		status: "todo",
		priority: "medium",
		dependencies: ["3", "4"],
		position: { x: 700, y: 300 },
	},
	{
		id: "6",
		title: "Pagar as contas de internet",
		description: "Tenho que ir pagar a internet mensal com urgência",
		status: "todo",
		priority: "high",
		dependencies: ["5"],
		position: { x: 1000, y: 300 },
	},
	{
		id: "7",
		title: "Fazer a tardezinha",
		description: "Fazer compras para a tardezinha",
		status: "todo",
		priority: "medium",
		dependencies: ["4"],
		position: { x: 400, y: 500 },
	},
	{
		id: "8",
		title: "Marcar consulta no hospital",
		description: "Agendar consulta médica de rotina",
		status: "todo",
		priority: "high",
		dependencies: ["7"],
		position: { x: 700, y: 500 },
	},
];
