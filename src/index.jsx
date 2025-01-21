import { useState, useEffect } from 'react'
import YAML from 'yaml'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Issue from './issue'


const TableOfContents = (props) => {
	const journal_title = props.table_of_contents["title"]
	const issues = props.table_of_contents["issues"]

	return (
		<div id="intro">
			<a class="return-home" href="https://openthresholds.org">home</a>
			<h1 id="introtitle"><span class="texthighlight">Paperology x Thresholds</span><br/><span class="pink">⇣</span></h1>
			
			<h5 id="introbyline">a project by<br/>Juliette De Maeyer, Aleksandra Kaminska, Rebecca Rouse, Whitney Trettien</h5>


			<a class="bi bi-chevron-right" href="/issue/paperology#rouse"></a>
			<div id="introtext">
			<h2><span class="texthighlight">⇠The making of a paper book.</span></h2>
			<br/>
			<p>The Paperology x Thresholds project is a digital remediation of a handcrafted, multi-authored artisanal book. It began as an album made by Rebecca Rouse, a games researcher and creator at Skövde University in Sweden. Folded like an accordion between its brown cloth covers is a long strip of white paper, pasted with blue envelopes. Rouse tucked scraps of different papers into the envelopes, then carefully labeled them with silver ink: Stonehenge Aqua Coldpress, Breitbahn Velouspapier, Yupo 100% Polypropylene Paper. She also pasted three blue boxes to the back endboard, which she had lined with marbled paper. One box holds a very tiny book, another a small book, and the third a large paper map, all handmade by Rouse herself. Titled <i>Paperology: An Ephemeral Portrait</i>, it is an album both blank and brimming with texture, structure, and possibility – much like paper itself.</p>
			<a href="/issues/paperology/cover-rouse.jpg" target="_blank"><img src="/issues/paperology/cover-rouse.jpg" /></a><br/>
			<a href="/issues/paperology/rouse-fig5.jpg" target="_blank"><img src="/issues/paperology/rouse-fig5.jpg" /></a><br/>
			<p>Rebecca had had the idea for the book while participating in the <a href="https://artefactlab.ca/paperology/" target="_blank">Paperology Reading and Activity Group</a> (Paperology RAG for short). This was a group of scholars, artists, and archivists that met virtually over the course of two (pandemic) years to think collectively about paper. The group was organized by Juliette De Maeyer, Aleksandra Kaminska, and Ghislain Thibault, faculty members in the Department of Communication at the Université de Montréal, along with Alysse Kushinski, postdoctoral researcher on the project. The Paperology meetings were based primarily on monthly discussions of thematically-organized readings, which were occasionally accompanied by special events, such as artist talks or craft activities.
			</p>
			<p>A few months into our virtual meetings, as a sense of camaraderie was forming amongst the regulars, Rebecca suggested we do something collectively. She proposed a travelling book, one that could be filled in as it moved from one person to the next. We heartily agreed. Paper was the thematic heart of the group, and now we could be a group whose virtual connections could also be materially mediated by paper. Rebecca made a blank accordion book above from scratch, and presented it to us.</p>
			<p>And that’s when this blank and yet brimming album began its journey. Twenty-one people signed up to contribute to the book and we devised an itinerary of 21 stops, starting in Skövde and ending in Montréal. In the album’s cardboard package, we added an instruction sheet with a few simple directions (“Contribute to the book in some way inspired by the Paperology RAG. We encourage a variety of shapes and forms, ways and means, contents and inscriptions!”) and a few prohibitions (“And above all… Thou Shall NOT Burn or Destroy The Book”).</p>
			<a href="/issues/paperology/instruction-1.jpg" target="_blank"><img src="/issues/paperology/instruction-1.jpg" /></a><br/>
			<a href="/issues/paperology/instruction-2.jpg" target="_blank"><img src="/issues/paperology/instruction-2.jpg" /></a><br/>
			<p>The album left Rebecca’s home in Skövde in January 2021. Over the following year and a half, it passed through Vienna, Göttingen, Berlin, and Cambridge. It crossed the ocean to reach the American states of Connecticut, New York, Massachusetts, Illinois, Michigan, North Carolina, Georgia, Louisiana, California, and Florida. Once in Canada, it moved again from coast to coast, passing through British Columbia and Ontario before arriving in Montréal, its final destination, in May 2022. It arrived there in the same box in which it started and, since someone early on decided to keep the old shipping labels in the box, we also had the paper trail. Throughout its journeys, only one small component from the original book was lost in the mail when it was shipped independently from the rest.</p>
			<a href="/issues/paperology/box.jpg" target="_blank"><img src="/issues/paperology/box.jpg" /></a><br/>
			<p>Along the way, it accumulated more paper: pink tissue paper wadded into tiny lumps glued into letterforms; tengucho paper used to print linoleum blocks; gold paper carefully cut in the style of an intricate, nineteenth-century American binding. Paper money, paper notebooks, paper photographs, paper receipts, paper silhouettes, paper fortunes, and paper bank envelopes were all woven and glued and arranged and annotated on the pages of the album. The small book was stamped, greeting cards became paper confetti, the tiny book was lost. Papertowels were sewn and embroidered into a new booklet. A board game was made. Images of paper printed on paper became an interactive peepshow, inviting the reader to pull it open and peer into its papery world. Each contributor explains and documents their own contribution in the digital remediation that follows; for now, we emphasize only the riot of texture and technique that accumulated around and in and on the album as it traveled across two continents.</p>
			<a href="/issues/paperology/box-open.jpg" target="_blank"><img src="/issues/paperology/box-open.jpg" /></a><br/>
			<a href="/issues/paperology/unveiling1.jpg" target="_blank"><img src="/issues/paperology/unveiling1.jpg" /></a><br/>
			<p>The book finally arrived in Montréal on the eve of the <a href="https://artefactlab.ca/paperology/symposium/" target="_blank">Paperology Symposium</a>, an in-person event that featured many Paperologists and contributors to the book. Finally, and together, we saw the book. It had completed its journey.</p>
			<p>The Paperology RAG was driven by a simple mandate &mdash; to explore paper &mdash; and energized by participants who, although geographically scattered, maintained their commitment to the group over a sustained period of time. In the process of working together month after month, we discovered and began to nurture among ourselves a shared desire to find different ways of collaborating on research and connecting across disciplines and distances. Academic “productivity” was never the end goal, although the project did produce several traditional scholarly outputs. Rather, we wanted to activate more creative modes of knowledge- and community-making. <i>Paperology: An Ephemeral Portrait</i> is one such example. Each contribution proposes a way of thinking about and with paper – historically, artistically, conceptually, from the perspective of literary and craft and media studies, as memoir and memory, as prosaic and political. Taken as a whole, the book shows the many directions thinking about paper can take us, as well as the many different ways research can unfold as a practice. It is networked and idiosyncratic; crafty and historical; serious and playful; collective but individually driven. Its ethos is generous, having been pieced together through our contributors’ collective goodwill, time, and openness to try new things.</p>
			<br/>
			<h2><span class="texthighlight">Remediating paper.⇢</span></h2>
			<p>With all this already contained in the initial project, why produce a digital remediation of a paper book about paper?</p>
			<p>We knew this would be a difficult process. Compared to the smooth, glowing surface of a screen, paper is much more tactile. It has different textures and varying levels of opacity, thickness and malleability. It has smells and makes sounds. A book like <i>Paperology: An Ephemeral Portrait</i> is especially difficult to capture on a web browser not only because of the many paper varieties it contains but also because it is a book with an unusual shape, filled with static and movable appendages: things that fold out, flip, open, pop out, or exist entirely outside of the book itself. Digitizing the surface of each page through a flatbed scanner, as one might the page of a printed book, would not convey the rich dimensionality of its contents. Even photographs, staged to show the book’s dimensionality, could not capture the experience of turning its pages, pulling scraps from the envelopes, or opening the many booklets stitched between its covers.</p>
			<p>And yet the project seemed worth attempting precisely because of its difficulties. The confrontation of paper and digital media – the transformation from one to the other – can be brutally revelatory. We suspected that the process itself would bring much about paper into sharp relief, which has always been one of the goals of this project. Sharing this unique book on the open web would also give it a wider audience of readers, who – even if they cannot touch or smell it – might still learn something about paper or about creative/critical scholarship and collaboration from its unique pages. We decided then that our goal was not to perfectly remediate the object of the book with all of its content and material layers. Instead, we focused on exploring how to adapt the unique affordances of our handcrafted, multi-authored artisanal book for the web.</p>
			<p>We approached Whitney Trettien, who co-created <i>thresholds</i>, a digital zine. Staged on a bespoke platform, issues of <i>thresholds</i> reimagine what a collaborative book might act like on a screen. Each article is comprised of two pages set side by side, as if the recto and verso of a book’s opening. These scroll together. To move between articles, the reader can navigate left or right, bumping one half screen at a time. In this way, the platform is designed to play with the boundaries of a book’s pages in a digital space rife with different affordances and limitations. Because <i>thresholds</i> is already imagining the relationship between the page and screen, between codex and accordion, it seemed an apt platform for remediating the Paperology Book.</p>
			<p>At the start of our collaboration, we approached all of the contributors with our concept and asked them to reflect back on their own participation in the project. To spur on their reflections, we provided a list of open-ended questions:
			</p>
			<ul>
				<li>What inspired your contribution?</li>
				<li>What is it?</li>
				<li>How did you make it?</li>
				<li>Had you done something like this before?</li>
				<li>Does it refer to a specific practice?</li>
				<li>Is it related to a particular historical and/or geographical space?</li>
				<li>Is it related to a specific aspect of your work, or life?</li>
				<li>Where can we learn more about this type of object?</li>
				<li>Is there any interesting story behind your materials? </li>
			</ul>
			<p>Rather than pressuring them to explain what they did, we hoped to create space for them to capture something of the experience of making this book alone and with others. With our digital remediation, our goal was not strictly to document or provide a digital archive of the book, although these concerns were present for us. Instead we wanted to better understand this polymorphous paper object by approaching it from a different angle. 
			</p>
			<p>We also asked them to provide some media that might accompany or act as their reflection. Some provided short texts directly addressing our questions. Others provided photos, stories, or videos. These tend to be on the verso or left side of each article in this remediated book. A few contributors declined to provide any additional materials, citing either restrictions on their time or having decided their original contribution spoke for itself. We still designed each page with an attention to detail about the contribution itself. On the right side of each article, we often include still images of the page or videos of Juliette discovering its many elements. By offering multiple angles from which to view and approach the book, we hoped to capture for our readers something of its multidimensionality.
			</p>
			<p>This design process was iterative, taking a transformative journey not unlike the book itself. In our earliest drafts, layouts pairing images with text or media from our contributors were too clean, and we realized something of the maximal aesthetic of the original object had been lost. Our word to name this loss became texture, and we began making up for its absence by taking “texture” photos: close-ups of the handmade papers with their rugged surfaces, the shine of light off of photo paper, or the shadows that played in a tiny wad of tissue. By leavening the digital remediation with these textures, we were finally able to return to the digital site a sense for the tumult of color and depth in the material book itself. The specific qualities of each paper contribution dictated the way we approached the digital remediation of its textural qualities.   
			</p>
			<p>We also played with different types of navigation. In a typical thresholds issue, the reader moves left or right in a loop, on a more or less linear track, although any given article can be accessed at any time by clicking on the thumbnails that line the bottom of the screen. In <i>Paperology: An Ephemeral Portrait</i>, though, the book contained two separate tracks that might be remediated: on the one hand, its chronological movement through time and space, as it passed from the hands of one contributor to another; on the other, the physical set of relationships that make up the book itself, especially the paper strip folded like accordion. These two tracks do not correspond to each other. One contributor might add something in the middle of one side of the strip of paper, while the next person it passed to might incorporate their contribution into a booklet tucked into the back of the album.</p>
			<img src="/issues/paperology/full1.png" /><br/>
			<h1>⇠⇢</h1>
			<img src="/issues/paperology/full2.png" /><br/>
			<p>We decided to try to capture both of these tracks by splitting up the navigation. There are two ways you can read the remediated book:</p>
			<p><span class="texthighlight"><b>Chronologically.</b></span> By clicking the <span className="bi-chevron-left pink"></span>left or right<span className="bi-chevron-right pink"></span> arrows at the edge of the screen, the main interface will guide you along this pathway. This route follows the book as it was passed from person to person, showing you the order in which the contributions were added no matter where the individual page appears within the physical book. To see where an article is in the book itself, look to the navigation strip at the bottom of the screen. The <span className="active">highlighted thumbnail</span> shows your current position.</p>
			<p><span class="texthighlight"><b>Physically.</b></span> At the bottom of the screen is a strip of thumbnails. This corresponds to the accordion strip of paper folded inside the album itself, showing the order of pages within the book. You can navigate the book as you would physically turn the and flip the accordion by following the thumbnails left to right, clicking on each individually to bring up a new page. You can also quickly jump to any page of the book using these thumbnails.</p>
			<p>There is no correct order in which to view the articles. We invite you to explore this digital remediation with the same openness, curiosity, and sense for serendipity that the paper object inspires. </p>
			<br/>
			<h2>----------</h2>
			<br/>
			<p>The editors would like to express their gratitude to John Herr, Andrew Janco, and Laith Weinberger for lending their technical expertise to this project. It would not exist without them.</p>
			<p><a href="https://juliettedm.wordpress.com/" target="_blank">Juliette De Mayer</a> and <a href="https://aleksandrakaminska.com/" target="_blank">Aleksandra Kaminska</a> are Associate Professors in the Department of Communication at the Université de Montréal.</p>
			<p><a href="http://www.rebeccarouse.com/" target="_blank">Rebecca Rouse</a> is Associate Professor in Media Arts, Aesthetics and Narration and Co-Director of PlayLab in the Division of Game Development at University of Skövde, Sweden.</p>
			<p><a href="https://whitneyannetrettien.com/ " target="_blank">Whitney Trettien</a> is Associate Professor of English and Faculty Director of the Price Lab for Digital Humanities at the University of Pennsylvania.</p>
			</div>
		</div>
	)
}

function isMobile() {
	const userAgent = navigator.userAgent.toLowerCase();
	return /mobile/i.test(userAgent); 
  }
  if (isMobile()) {
	alert("This website is not optimized for mobile devices. Please access from a desktop or laptop computer."); 
  }

const GetYaml = () => {
	const [table_of_contents, setTableOfContents] = useState({})
	const [isLoading, setLoading] = useState(true)
	
	const url = `/thresholds.yml`
	useEffect(() => {
		fetch(url)
			.then((res) => res.text())
			.then((data) => {
				const table_of_contents_yml = YAML.parse(data)
				const table_of_contents_json = JSON.stringify(table_of_contents_yml, null, 4)
				setTableOfContents(JSON.parse(table_of_contents_json))
				setLoading(false)
			})
	}, [])

	if (isLoading) return undefined
	return table_of_contents
}

export default function App(props) {
	const table_of_contents = GetYaml()

	if (!table_of_contents) return <p>Loading, please wait.</p>

	const router = createBrowserRouter([
		{
			path: "/",
			element: <TableOfContents table_of_contents={table_of_contents} />
		},
		{
			path: "/issue/:slug",
			element: <Issue {...props} table_of_contents={table_of_contents} GetYaml={GetYaml} />
		}
	])

	return <RouterProvider router={router} />
}