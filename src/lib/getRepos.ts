import 'server-only';
import { RepositoryEdge } from 'generated/graphql';
import { unstable_noStore as noStore } from 'next/cache';

/*const getRepos = async (): Promise<RepositoryEdge[]> => {
  noStore();
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `
				query viewer {
					viewer {
						repositories(first: 8, orderBy: {field: STARGAZERS, direction: DESC}) {
							edges {
								node {
									id
									name
									url
									description
									stargazers {
										totalCount
									}
									forkCount
									languages(first: 3) {
										nodes {
											id
											name
										}
									}
								}
							}
						}
					}
				}
			`,
    }),
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data.data.viewer.repositories.edges;
};

export default getRepos;*/
const getRepos = async (): Promise<any[]> => {
	const selectedRepos = [
		{owner: "cmput402-w25", name: "402-group-project-h01-group14"},
		{owner: "UAlberta-CMPUT401", name: "f24project-Kayanou"},
		{owner: "CMPUT301F23T29", name: "agile-beast"},
		{owner: "SG-TRINITY", name: "Fairness-Analysis-Of-COMPAS-Tool"},
		{owner: "SG-TRINITY", name: "Image-histogram-and-equalization"},
		{owner: "SG-TRINITY", name: "School-Administration-System"},
		{owner: "SG-TRINITY", name: "Book-Web-Scraper"},
		{owner: "SG-TRINITY", name: "HR-Presence-Analysis"},
	];

	const queryBody = selectedRepos
		.map((repo,index) =>{
			return `
				repo${index}: repository(owner: "${repo.owner}", name: "${repo.name}") {
					id
					name
					url
					description
					stargazers {
						totalCount
					}
					forkCount
					languages(first: 3) {
						nodes {
							id
							name
						}
					}
				}
			`;
		})
		.join('\n');

		const fullQuery = `
			query {
				${queryBody}
			}
		`;

		const res = await fetch("https://api.github.com/graphql",{
			method: "POST",
			body: JSON.stringify({ query: fullQuery }),
			headers: {
				Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
				"Content-Type": "application/json"
			},
			next: {revalidate: 3600}
		});

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		const json = await res.json();
		return Object.values(json.data);
};

export default getRepos;