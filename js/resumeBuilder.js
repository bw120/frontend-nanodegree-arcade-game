//bio json
var bio = {
	"name": "Ben Wright",
	"logo": "images/logo.svg",
	"role": "Web Developer",
	"contacts" : {
		"mobile": "978-866-4808",
		"email": "benwright120@gmail.com",
		"github": "bw120",
		"twitter": "@ben120",
		"location": "Boston, MA"
	},
	"welcomeMesage": "Hire me. I am awesome!",
	"skills": ["HTML", "CSS", "JavaScript", "jQuery", "GitHub", "Photoshop", "Illustrator"],
	"biopic": "images/ben.jpg",
	"display": function(){
		//swap in the info from json into formatted html
		var logo = '<img src="%data%" class="logo">';
		var formattedLogo = logo.replace("%data%", bio.logo);
		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
		var formattedMobile = HTMLmobile.replace("%data%", "<span class='orange-text icons zocial-call'></span>" + bio.contacts.mobile);
		var formattedEmail = HTMLemail.replace("%data%", "<span class='orange-text icons zocial-email'></span>" + bio.contacts.email);
		var formattedTwitter = HTMLtwitter.replace("%data%", "<span class='orange-text icons zocial-twitter'></span>" + bio.contacts.twitter);
		var formattedGithub = HTMLgithub.replace("%data%", "<span class='orange-text icons zocial-github'></span>" + bio.contacts.github);
		var formattedLocation = HTMLlocation.replace("%data%", "<span class='orange-text icons fontawesome-globe'></span>" + bio.contacts.location);
		var formattedWelcome = HTMLWelcomeMsg.replace("%data%", bio.welcomeMesage);
		var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
		var formattedSkills;

		//add all the data to the page
		$("#header").prepend(formattedRole);
		$("#header").prepend(formattedName);
		$("#header").prepend(formattedLogo);
		$("#header").append(formattedPic);
		$("#header").append(formattedWelcome);
		$("#header").append(HTMLskillsStart);
		//cycle through all the skills and add
		for (x in bio.skills) {
			formattedSkills = HTMLskills.replace("%data%", bio.skills[x]);
			$("#skills").append(formattedSkills);
		};

		$("#topContacts").append(formattedMobile);
		$("#topContacts").append(formattedEmail);
		$("#topContacts").append(formattedTwitter);
		$("#topContacts").append(formattedGithub);
		$("#topContacts").append(formattedLocation);
		$("#footerContacts").append(formattedMobile);
		$("#footerContacts").append(formattedEmail);
		$("#footerContacts").append(formattedTwitter);
		$("#footerContacts").append(formattedGithub);
		$("#footerContacts").append(formattedLocation);

		//additional format adjustment for logo, name & role
		$("#header img:first, #header h1:first,  #header span:first").wrapAll("<div class='top-header'></div>")
		$("#header h1:first,  #header span:first").wrapAll("<div class='name-title'></div>");
		$("#header span:first").addClass("role");
	}
};

//education json
var education = {
	"school": [
		{
		"name": "Rochester Institute of Technology",
		"location": "Rochester, NY",
		"degree": "BS",
		"majors": "New Media Publishing",
		"dates": "1999 - 2003",
		"url": "www.rit.edu"
		}
	],
	"onlineCourses" : [
		{
		"title": "JavaScript Basics",
		"school": "Udacity",
		"date": "April 2015",
		"url": "www.udacity.com"
		},
		{
		"title": "Intro to jQuery",
		"school": "Udacity",
		"date": "April 2015",
		"url": "www.udacity.com"
		},
		{
		"title": "Responsive Web Design Fundamentals",
		"school": "Udacity",
		"date": "March 2015",
		"url": "www.udacity.com"
		},
		{
		"title": "Responsive Images",
		"school": "Udacity",
		"date": "March 2015",
		"url": "www.udacity.com"
		},
		{
		"title": "How to Use Git and GitHub",
		"school": "Udacity",
		"date": "March 2015",
		"url": "www.udacity.com"
		}
	],
	"display": function(){
		//format and add the school details
		for (x in education.school) {

			var formattedName = HTMLschoolName.replace("%data%", education.school[x].name);
			var formattedDegree = HTMLschoolDegree.replace("%data%", education.school[x].degree);
			var formattedDates = HTMLschoolDates.replace("%data%", education.school[x].dates);
			var formattedLocation = HTMLschoolLocation.replace("%data%", education.school[x].location);
			var formattedMajor = HTMLschoolMajor.replace("%data%", education.school[x].majors);

			var schoolDetails =  formattedName + formattedDegree + formattedDates + formattedLocation + formattedMajor;
			$("#education").append(HTMLschoolStart);
			$(".education-entry:last").append(schoolDetails);
		}

		//format and add the online class details
		$("#education").append("<br>" + HTMLonlineClasses);
		$("#education").append(HTMLschoolStart);

		for (x in education.onlineCourses) {

			var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[x].title);
			var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[x].school);
			var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[x].date);
			var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[x].url);
			var onlineDetails =  formattedTitle + formattedSchool + formattedDates + formattedURL;


			$(".education-entry:last").append(onlineDetails);
		};
	}
};

//work json
var work = {
	"jobs": [
		{
		"employer": "Pearson",
		"title": "Procurement and Manufacturing Specialist",
		"location": "Boston, MA",
		"dates": "March 2009 - present",
		"description": "Coordinate print and media projects with various vendors. Request quotes and cut purchase orders. Negotiate resolutions to billing disputes and quality issues. Work with vendors to maintain schedules, price targets and ensure products meets customer needs."
		},
		{
		"employer": "Quebecor World",
		"title": "Customer Service Representative",
		"location": "Leominster, MA",
		"dates": "October 2006 - October 2008",
		"description": "Coordinated with book publishers to ensure that the instructions from the customer are accurately represented in the plant. Coordinated and managed work with various departments, personnel and outside vendors. Managed several accounts that each brought in over $1 million in annual revenue to the plant."
		},
		{
		"employer": "Acme Bookbinding",
		"title": "Imaging Manager and Customer Service",
		"location": "Charlestown, MA",
		"dates": "June 2003 - October 2006",
		"description": "Manage the scanning, prepress, design & digital print workflow. Attended trade shows including On-Demand and BookTech to evaluate new software and equipment. Acted as a liaison between the print customers and Acme. Assisted in planning the web based book builder site. "
		},
		{
		"employer": "RIT Prepress & Publishing Lab / Digital Publishing Center ",
		"title": "Operations Manager",
		"location": "Rochester, NY",
		"dates": "March 2002 - March 2003",
		"description": "Established and managed the digital printing workflow. Maintained computers, servers, networks and printing equipment. Created a web based job scheduling system programmed using PHP, HTML, CSS and JavaScript. "
		},
		{
		"employer": "RIT Prepress & Publishing Lab / Digital Publishing Center ",
		"title": "Lab Assistant",
		"location": "Rochester, NY",
		"dates": "October 1999 - March 2002",
		"description": "Trained students with the use of scanners, printing equipment and graphics software including Photoshop, Illustrator and InDesign. Resolved problems and helped maintain computers, servers, networks and equipment. "
		},
		{
		"employer": "Avid Technology",
		"title": "Engineering Intern",
		"location": "Tewksbury, MA",
		"dates": "September 1998 - August 2008",
		"description": "Developed and maintained several intranet sites. Conducted quality assurance for Avid’s Review and Approval service and for the Avid Production Network web site."
		}
	],

	"display": function(){

		for (x in work.jobs) {
			//swap in the data into the formatted HTML
			var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[x].employer);
			var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[x].title);
			var formattedDates = HTMLworkDates.replace("%data%", work.jobs[x].dates);
			var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[x].location);
			var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[x].description);
			var job = formattedEmployer + formattedTitle + formattedDates + formattedLocation + formattedDescription;

			//add all the formated info to the page
			$("#workExperience").append(HTMLworkStart);
			$(".work-entry:last").append(job);
		};
	}
};

//projects json
var projects = {
	"project": [
		{
		"title": "Portfolio website",
		"dates": "March 2015",
		"description": "Built a portfolio website to display the projects I will be doing for the Udacity Front End Nano degree. The sites demonstrates my ability to create a responsive site with responsive images.",
		"images": ["images/portfolio_thumb.jpg", "http://placehold.it/125x125", "http://placehold.it/125x125"]
		}
	],
	"display": function(){

		for (x in projects.project) {
			// format and add project info
			var formattedTitle = HTMLprojectTitle.replace("%data%", projects.project[x].title);
			var formattedDates = HTMLprojectDates.replace("%data%", projects.project[x].dates);
			var formattedDescription = HTMLprojectDescription.replace("%data%", projects.project[x].description);
			var formattedImages = "";
			//cycle through project images
			for (z in projects.project[x].images) {
				formattedImages = formattedImages + HTMLprojectImage.replace("%data%", projects.project[x].images[z]);
			};

			var project = formattedTitle + formattedDates + formattedDescription + formattedImages;

			$("#projects").append(HTMLprojectStart);
			$(".project-entry:last").append(project);
			$(".project-entry > img").addClass("border");
		};
	}
};

//call display functions to add to resume page
bio.display();
work.display();
projects.display();
education.display();
$("#mapDiv").append(googleMap);