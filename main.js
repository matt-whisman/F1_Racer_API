let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(searchForm);
  let year = formData.get("yearInput");
  let round = formData.get("roundInput");
  console.log(`http://ergast.com/api/f1/${year}/${round}/driverStandings.json`);

  fetch(`http://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
    .then((result) => result.json())
    .then((data) => displayStandings(data))
    .catch((err) => console.error(err));
});

function displayStandings(data) {
  let standingEl = document.getElementById("standing");

  if (Object.values(data).length == 0) {
    standingEl.innerHTML = "<p>No standings found.</p>";
    return false;
  }

  let standingsHTML = "";

  for (var driver of data.MRData.StandingsTable.StandingsLists[0]
    .DriverStandings) {
    standingsHTML += `
      <tr>
        <td>${driver.position}</th>
        <td>${driver.Driver.givenName} ${driver.Driver.familyName}</td>
        <td>${driver.Driver.nationality}</td>
        <td>${driver.Constructors[0].name}</td>
        <td>${driver.points}</td>
      </tr>
    `;
  }
  standingEl.innerHTML = standingsHTML;
}
