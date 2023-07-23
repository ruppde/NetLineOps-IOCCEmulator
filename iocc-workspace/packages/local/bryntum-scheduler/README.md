How to use the package in a workspace:
  
1) Install the package (extract `*.pkg` file into packages folder in your workspace or use `sencha package add *.pkg` if you have repository configured).

2) Configure your app.json. The package doesn't have stylesheets onboard so you also have to provide one of its existing themes (`bryntum-scheduler-classic`, `bryntum-scheduler-crisp`, `bryntum-scheduler-neptune`) to the `requires` section:

	{
		"name" : "MyApp",
		"theme": "ext-theme-neptune",
		
		...
		
		// the scheduler and its theme
		"requires" : [
			"bryntum-scheduler",
			// since the application uses extjs neptune theme
			// we use corresponding theme package for the scheduler
			"bryntum-scheduler-neptune"
		],
		
		...
	}
