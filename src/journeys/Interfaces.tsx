export interface JourneyProps {
	goal: {
		type: string;
		fields?: {
			[key: string]: string;
		},
		submitAction?: any;
	},
	pages: {
		[key: string]: JourneyPage | JourneyDefinition;
	},
	path?: string;
}

export interface JourneyPage {
	template: string;
	path: string;
	initial?: boolean;
	templateProps?: {
		[key: string]: string | number | object;
	}
}

export interface JourneyDefinition {
	journey: string;
	path: string;
	initial?: boolean;
	journeyProps?: {
		nextScreen?: string;
	}
}

export interface JourneyRouteProps {
	Route: React.FunctionComponent<any>;
	path: string;
	passedProps: any;
	nextScreen?: string;
	index: number;
}

export type TemplateProps = {
	nextScreen: string;
	templateProps: {
		[key: string]: string | number | object | object[];
	},
	history?: any
	defaultAction?: any
};

