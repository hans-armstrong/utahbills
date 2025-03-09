<template>
    <div class="relative">
        <div class="relative h-screen flex justify-center flex-wrap overflow-hidden">
            <div class="absolute inset-0 w-full h-screen bg-no-repeat bg-cover bg-center bg-hero"></div>
            <div class="absolute w-full h-screen text-center text-white hero-text
            z-20
            md:z-0

            top-[5%]
            sm:top-[15%]
            md:top-[10%]
            lg:top-[1%]
            drop-shadow-[-10px_30px_30px_rgba(0,0,0,0.2)]
            ">
                UTAH BILLS</div>
            <div class="absolute inset-0 w-full bg-no-repeat bg-cover bg-center bg-building "></div>

            <div class="absolute w-screen
            top-[53%]
            sm:top-[60%]
            m-auto
            flex justify-center
            ">
                <div class="relative w-[75%] m-auto
                
                ">
                    <div ref="divToMatch" class="absolute z-20 p-6 pb-7 m-auto w-full text-center
                    text-[1rem]
                    md:text-2xl 
                    lg:text-2xl hero-sub-text drop-shadow-[0_10px_10px_rgba(255,255,255,1)] rounded-md">
                        <h2 class="drop-shadow-md">Empowering you with knowledge. Track the bills passing through the
                            Utah State legislature
                            each
                            year.</h2>
                    </div>
                    <div ref="divToMatch" class="absolute z-20 p-6 pb-7 m-auto w-full text-center
                    text-[1rem]
                    md:text-2xl 
                    lg:text-2xl bg-white opacity-55  rounded-md">
                        <h2 class="drop-shadow-md">Empowering you with knowledge. Track the bills passing through the
                            Utah State legislature
                            each
                            year.</h2>
                    </div>
                    <div
                        class="absolute p-8 text-center m-auto w-full
                        sm:p-6 
                        top-44 
                        sm:top-32 
                        text-sm 
                        sm:text-xl 
                        sm:mt-8 
                        z-40 rounded-full hero-sub-text">
                        <h3>The 2025 General Session has ended. The Governor has till March 27th to veto else bills enact on May 7th.</h3>
                    </div>
                    <div
                        class="absolute p-8 text-center m-auto w-full
                        sm:p-6 
                        top-44 
                        sm:top-32 
                        text-sm 
                        sm:text-xl 
                        sm:mt-8 
                        z-40 bg-amber-100 opacity-85 rounded-full">
                        <h3>The 2025 General Session has ended. The Governor has till March 27th to veto else bills enact on May 7th.</h3>

                    </div>
                </div>

            </div>
        </div>
        <div class=" w-full flex justify-center flex-wrap ">
            <div class="p-6 mx-[5%] bg-neutral-100">
                <!-- <div class="text-2xl mt-8">
                    <h3>The 2024 General Session has ended. The next General Session starts January 21th,
                        2025.</h3>
                </div> -->
                <div class="mt-8 bg-white w-[70%] m-auto rounded-xl p-6 text-center text-lg drop-shadow-sm">
                    <h4>Save your legislators below so you'll never forget them! <a
                            href="https://le.utah.gov/GIS/findDistrict.jsp" target="_blank" class="link">Find your
                            representatives here. </a></h4>
                </div>
                <!-- Didn't have time to implement this feature to it's full potential-->
                <LegislatorSelector class="mt-4 w-[70%] m-auto" />

                <div class="text-2xl mt-10">
                    <h5>If you only learn two things...</h5>
                </div>
                <div class="mt-2">
                    <p>
                        Many people’s knowledge of the Utah State Legislature is sparse; somehow a bill is written,
                        voted
                        on by both houses (House of Representatives and the Senate) and if it passes then it becomes
                        law,
                        but can still be vetoed by the Governor and if necessary the veto can be overridden by a vote
                        from
                        both houses voting but...
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 w-full drop-shadow-sm rounded-md ">
                    <div class="w-full">
                        <Disclosure as="div" class="p-4 px-6 bg-white " v-slot="{ open }">
                            <DisclosureButton @click="showFirstImage" class="w-full">
                                <div class="text-lg pt-2 flex flex-wrap justify-between">
                                    <h6>Your legislator has to sponsor a bill for it to be voted on.
                                    </h6>
                                    <div><i class="fa-solid fa-chevron-down self-center " :class="open && 'rotate-180 transform transition-transform'"></i></div>
                                </div>
                                <img v-if="showFirst == true" :src="imageUrlBill">
                            </DisclosureButton>
                            <DisclosurePanel as="div">
                                <div>
                                    <p>
                                        <hr class="my-4">
                                        The major points missing from common knowledge, and one of the main things to
                                        takeaway from the Utah’s legislative process, is that your elected legislator
                                        has to
                                        sponsor the bills that can be voted on and then passed into law. <br>
                                        The person you
                                        vote
                                        for has a tremendous responsibility to choose bills and convince others to vote
                                        for
                                        them. <br><br>Your legislator also needs to find a sponsor from the opposite
                                        house
                                        (House of
                                        Representatives or Senate) so that it is sponsored in that house. Electing
                                        representatives who can champion these bills, and establish working
                                        relationships
                                        with members of all parties and houses to attain sponsors is crucial for the
                                        functioning of our government. The Utah legislature is dependent on
                                        bipartisanship.<br><br>
                                        Though with the two-party system, which dominates America, party affiliation has
                                        made it easier for legislators to decide which bills to sponsor, find sponsors
                                        in
                                        the opposite house, and how to vote on bills they have not read. Many
                                        responsibilities of the legislator can be decided by party leadership and a
                                        party’s
                                        stances on issues.<br><br>
                                        How does our legislature have time to read hundreds of bills in just 45 days?
                                        The
                                        benefits of political parties is that representatives of that party have their
                                        vote
                                        decided for them by party leadership, so they don’t need to thoroughly
                                        understand
                                        each bill. Citizens also feel assured that by voting for these representatives,
                                        votes will follow that party’s ideology. <br><br><strong>Here is an in-depth
                                            look at the
                                            politics
                                            involved in passing a bill, also known as learning, <a class="link"
                                                href="https://www.ncsl.org/legislative-staff/civics-education/learning-the-game"
                                                target="_blank">“The Game.”</a></strong><br><br>There are many
                                        ways
                                        to kill a bill and without parties or trust between politicians it would be
                                        tremendously difficult to pass anything.
                                        The real issue is that by the time the bills are made public, citizens are
                                        forced to
                                        scramble to read all the bills and voice their opinions to these representatives
                                        before they become law.
                                    </p>
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </div>
                    <div class="w-full">
                        <Disclosure as="div" class="p-4 px-6 bg-white" v-slot="{ open }">
                            <DisclosureButton @click="showSecImage" class="w-full">
                                <div class="text-lg pt-2 flex flex-wrap justify-between">
                                    <h6>Your legislator is selected to serve on committees that read
                                            bills.</h6>
                                    <div><i class="fa-solid fa-chevron-down self-center " :class="open && 'rotate-180 transform transition-transform'"></i></div>
                                </div>
                                <img v-if="showSec == true" :src="imageUrlServe">
                            </DisclosureButton>
                            <DisclosurePanel as="div" >
                                <div>
                                    <p>
                                        <hr class="my-4">
                                        One of the biggest influences on legislation are committees. Committees do the
                                        homework of reading and studying bills. Legislators can be appointed to
                                        committee
                                        chairs by the Speaker of the House or the President of the Senate and other
                                        legislators are appointed as chairmen by party leadership.<br><br> Bills are
                                        assigned to
                                        these committees by subject where they will be amended, substituted, held for a
                                        future meeting, tabled until the next meeting (which could kill the bill if not
                                        picked up again), or passed favorably and given to the house or senate to be
                                        voted
                                        with a committee report and fiscal note attached.<br><br>
                                        Your legislators hold memberships on two Standing Committees in their house (eg.
                                        House Education Standing Committee or the Senate Education Standing Committee)
                                        and
                                        one Joint appropriation committee (deciding government budgets).<br><br> In the
                                        months
                                        between legislative sessions, they also are appointed to Interim Committees (eg.
                                        Education Interim Committee) and Special Legislative Committees (eg. Utah
                                        Technology
                                        Commission) to study key issues, receive public comment and recommend upcoming
                                        legislation.<br><br>
                                        Legislation under consideration by a Standing Committee is subject to four
                                        distinct
                                        phases during a committee meeting:<br>
                                        1.) The sponsor's presentation of the bill<br>
                                        2.) Clarifying questions<br>
                                        3.) Public comment<br>
                                        4.) Committee action (amend, substitute, hold, table)<br><br>
                                        <strong><a class="link"
                                                href="https://le.utah.gov/documents/aboutthelegislature/TestifyingbeforeaLegislativeCommittee.htm"
                                                target="_blank">You can share your opinion by testifying.</a></strong>
                                    </p>
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </div>
                </div>
                <!-- <div class="grid grid-cols-2 mt-6 w-full text-center drop-shadow-sm ">
                    <img :src="imageUrlBill">
                    <img :src="imageUrlServe">
                </div> -->
                <div class="text-3xl mt-32">
                    <h5>How a Bill becomes Law in Utah</h5>
                </div>
                <div class="mt-6">
                    <p>
                        Now that you have a better understanding about sponsoring bills and committees, you’ll
                        be able to follow how a bill becomes law. You may have heard that different states and have
                        different processes for passing a bill. But you’d be surprised just how different it can be,
                        down to
                        what color paper is used (goldenrod for senate bill amendments and lilac for house bill
                        amendments).
                        <a class="link"
                            href="https://www.ncsl.org/about-state-legislatures/inside-the-legislative-process#PublishedSections"
                            target="_blank">The National Conference for State Legislators provides detailed comparisons
                            of all the states</a>
                        and is a great resource to dive deeper into legislative minutia.
                    </p>
                </div>
                <div class="text-2xl mt-6">
                    <h6>You need to write a bill in order to pass a bill...</h6>
                </div>
                <div class="mt-2">
                    <p>
                        The legislator files a request for legislation with the Office of Legislative Research and
                        General
                        Counsel, a nonpartisan, permanent fixture in the Utah State Government.
                        <br> <br>
                        The office will assign an attorney to draft the bill for the legislator (or review written
                        drafts),
                        make corrections, reviews constitutional concerns and sends the draft to the legislator for
                        approval. A fiscal analyst will also review it for prospective budget impacts and attach a
                        Fiscal
                        Note. Any studies done by an interim committee (committees than run in-between General Sessions)
                        will also be attached.
                        <br><br>
                        The legislator will review and approve the draft and then introduce it to their house floor to
                        start
                        the bill passing process.
                        <br><br>
                        Utah’s bill passing process is slightly different for both houses. The Utah Constitution gives
                        the
                        House and the Senate power to make rules to govern their own procedures. Though both follow
                        joint
                        rules and provisions from the Utah Constitution, arguably the most important of which is that
                        each
                        bill must have three “readings” in each house. The House and Senate have different procedures to
                        conduct the readings.
                    </p>
                </div>
                <div class="flex flex-wrap align-center mt-6 justify-between justify-items-center w-full">
                    <button class="statusButton" @click="selected = 'introduced'">
                        <img class="statusImages" :src="icons.billsponsor_1">
                        <h6>Introduced</h6>
                    </button>
                    <i class="text-2xl self-center p-5 fa-solid fa-arrow-right"></i>
                    <button class="statusButton" @click="selected = 'engrossed'">
                        <img class="statusImages" :src="icons.buildingicon">
                        <h6>Engrossed</h6>
                    </button>
                    <i class="text-2xl self-center p-5 fa-solid fa-arrow-right"></i>
                    <button class="statusButton" @click="selected = 'enrolled'">
                        <img class="statusImages" :src="icons.equal">
                        <h6>Enrolled</h6>
                    </button>
                    <i class="text-2xl self-center p-5 fa-solid fa-arrow-right"></i>
                    <button class="statusButton" @click="selected = 'signed'">
                        <img class="statusImages" :src="icons.billsigned">
                        <h6>Signed</h6>
                    </button>
                    <i class="text-2xl self-center p-5 fa-solid fa-arrows-turn-right"></i>
                    <button class="statusButton" @click="selected = 'vetoed'">
                        <img class="statusImages" :src="icons.anvil">
                        <h6>Vetoed</h6>
                    </button>
                    <i class="text-2xl self-center p-5 fa-solid fa-arrows-turn-right"></i>
                    <button class="statusButton" @click="selected = 'failed'">
                        <img class="statusImages" :src="icons.vote">
                        <h6>Failed</h6>
                    </button>
                </div>
                <div>
                    <div class="tooltip1 mt-4  w-full min-h-[500px] border" v-if="selected == 'introduced'">
                        <div class="statusTitle"><span>Introduced</span></div>
                        <span class="text-lg">
                            The sponsor of the bill, who is a
                            <select class=" bg-stone-200 p-2 rounded-lg" v-model="selectLegislator">
                                <option value="representative">Representative</option>
                                <option value="senator">Senator</option>
                            </select>, introduced the bill in the <strong>{{ selectedHouse }}</strong>.
                        </span>
                        <div class="mt-4"><span class="font-bold">First Reading</span>
                            <p>The bill is "read" for the first time. A bill is required to be read three times thanks
                                to a rule back to English times when reprinting a bill was an issue. This practice
                                provided that legislators would be informed as to what the bill proposed to do. Today,
                                this requirement is suspended in part, as allowed by the Utah Consitution, to instead
                                require three readings of the short title of the bill, not three readings of the entire
                                bill <a class="link"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Utah State Government ~ A Citizens Guide).</a></p>
                        </div>

                        <div class="mt-4">
                            <p>The bill is referred to the <strong>{{ selectedHouse }}</strong> Rules Committee where
                                the bill is
                                examined for proper form and fiscal impact. The Rules Committee recommends to the
                                <strong>
                                    {{ selectedOfficer }}
                                </strong> the Standing Committee to which the bill should be referred based on
                                subject matter.</p>
                        </div>

                        <!-- Standing Committees -->
                        <div class="mt-4">
                            <p>The assigned standing committee, in public session, holds a meeting to review the bill.
                                The committee may amend, hold, table, substitute, or make a favorable recommendation on
                                the bill.</p>
                            <ul class="mt-4">
                                <li>~ The Committee Chair puts the bill on the agenda</li>
                                <li>~ The Bill Sponsor presents the bill to the committee</li>
                                <li>~ The Chair allows public comments</li>
                                <li>~ Action may be taken on the bill (amend, hold, table, substitute or pass to the
                                    floor)</li>
                            </ul>
                        </div>

                        <div class="mt-4">The bill succeeds in committee and is passed to the corresponding chamber with
                            a Committee Report.</div>
                            <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>

                    </div>
                    <div class="tooltip1 mt-4 w-full min-h-[500px] border" v-else-if="selected == 'engrossed'">
                        <div class="statusTitle"><span>Engrossed</span></div>
                        <span class="text-lg"> The bill is engrossed after is it voted on and passed by the first chamber, the <strong>{{
                                selectedHouse }}</strong>.</span>

                        <div v-if="selectLegislator == 'representative'">

                            <div class="mt-4"><span class="text-lg">The following happens in the House:</span></div>
                            <div class="mt-4"><span class=" font-bold">Second Reading</span>
                                <p>The Committee Report is read by the house and adopted by motion. Adoption of the
                                    standing committee report in the house is considered the second reading of the three
                                    constitutionally required readings. No debates or amendments are allowed at this
                                    stage.</p>
                            </div>
                            <div class="mt-4"><span class=" font-bold">Third Reading</span>
                                <p>The bill is read to the house by title a third time and then explained by the
                                    sponsoring representative who answers questions that may be asked. Other
                                    representatives may speak and propose amendments to the bill.</p>
                            </div>
                            <div class="mt-4"><span class=" font-bold">Vote</span>
                                <p>Bill must pass by a constitutional majority (38/75). A motion for "previous
                                    question," which requires a two-thirds vote in the house, closes debate and stops
                                    further amendment to the bill.</p>
                            </div>
                            <div class="mt-4">
                                <p>The bill is now engrossed and is transmitted to the senate to repeat the process. The
                                    Bill's Sponsor must find a Floor Sponsor in the senate to represent the bill.</p>

                            </div>
                            <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>
                        </div>
                        <div v-else-if="selectLegislator == 'senator'">

                            <div class="mt-4"><span class="text-lg">The following happens in the Senate:</span></div>
                            <div class="mt-4"><span class=" font-bold">Committee Report</span>
                                <p>The Committee Report is read by the senate and adopted by motion. The senate's
                                    adoption of the standing committee report is not considered the second reading.</p>
                            </div>
                            <div class="mt-4"><span class=" font-bold">Second Reading</span>
                                <p>The bill is read a second time and debated. It can be substituted or amended. It is
                                    voted on and must pass a majority of the senators in order to advance to the third
                                    reading. </p>
                            </div>
                            <div class="mt-4"><span class=" font-bold">Third Reading</span>
                                <p>The bill is read a read a third time and debated. It is voted on and must recieve a
                                    majority (15/29) vote to pass. </p>
                            </div>
                            <div class="mt-4"><span class=" font-bold">Final Vote</span>
                                <p>The bill must pass by a constitutional majority (15/29).</p>
                            </div>
                            <div class="mt-4">
                                <p>The bill is now engrossed and is transmitted to the House of Representatives to
                                    repeat the process. The Bill's Sponsor must find a Floor Sponsor in the house to
                                    represent the bill. </p>
                            </div>
                            <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>
                        </div>

                    </div>
                    <div class="tooltip1 mt-4 w-full min-h-[500px] border" v-else-if="selected == 'enrolled'">
                        <div class="statusTitle"><span>Enrolled</span></div>
                        <span class="text-lg"> The bill is enrolled after it passed by the second chamber, the <strong>{{ selectedHouse == 'House of Representatives' ? 'Senate' : 'House of Representatives' }}</strong>.</span>
                        <div v-if="selectLegislator == 'representative'">

                            <div class="mt-4"><span class="text-lg">The following happens in the Senate:</span></div>
                            <div class="mt-4"><span class="font-bold">Committee Report</span>
                                <p>The Committee Report is read by the senate and adopted by motion. The senate's
                                    adoption of the standing committee report is not considered the second reading.</p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Second Reading</span>
                                <p>The bill is read a second time and debated. It can be substituted or amended. It is
                                    voted on and must pass a majority of the senators in order to advance to the third
                                    reading. </p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Third Reading</span>
                                <p>The bill is read a read a third time and debated. It is voted on and must recieve a
                                    majority (15/29) vote to pass. </p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Final Vote</span>
                                <p>The bill must pass by a constitutional majority (15/29).</p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Concurrence/Conference Committee</span>
                                <p>Any amendments made in the second chamber must be approved by the first chamber. If there
                                    is a disagreement between the chambers on any modifications, a conference committee is
                                    formed by three senators appointed by the president of the senate and three
                                    representatives appointed by the speaker of the house. The conference committee
                                    attempts to work out a compromise on the bill. The conference committee report and
                                    teh bill must then be approved by each chamber for a bill to pass. If the conference
                                    committee report and actions are rejected by either chamber, a new conference commitee
                                    can be established. If a compromise cannot be reached a bill dies. </p>
                            </div>
                            <div class="mt-4">
                                <p>The bill is sent to presiding officers (Speaker of the House, President of the
                                    Senate, Lieutenant Governor ect.) to be signed. Enrollment is a final examination to
                                    find any technical erros and verify votes. After it has been enrolled, it will
                                    become
                                    law sixty days following the legislative session whether or not the Governor signs
                                    it. </p>
                            </div>
                            <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>
                        </div>
                        <div v-else-if="selectLegislator == 'senator'">
                            <div class="mt-4"><span class="text-lg">The following happens in the House:</span></div>
                            <div class="mt-4"><span class="font-bold">Second Reading</span>
                                <p>The Committee Report is read by the house and adopted by motion. Adoption of the
                                    standing committee report in the house is considered the second reading of the three
                                    constitutionally required readings. No debates or amendments are allowed at this
                                    stage.</p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Third Reading</span>
                                <p>The bill is read to the house by title a third time and then explained by the
                                    sponsoring representative who answers questions that may be asked. Other
                                    representatives may speak and propose amendments to the bill.</p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Vote</span>
                                <p>Bill must pass by a constitutional majority (38/75). A motion for "previous
                                    question," which requires a two-thirds vote in the house, closes debate and stops
                                    further amendment to the bill.</p>
                            </div>
                            <div class="mt-4"><span class="font-bold">Concurrence/Conference Committee</span>
                                <p>Any amendments made in the second chamber must be approved by the first chamber. If there
                                    is a disagreement between the chambers on any modifications, a conference committee is
                                    formed by three senators appointed by the president of the senate and three
                                    representatives appointed by the speaker of the house. The conference committee
                                    attempts to work out a compromise on the bill. The conference committee report and
                                    teh bill must then be approved by each chamber for a bill to pass. If the conference
                                    committee report and actions are rejected by either chamber, a new conference commitee
                                    can be established. If a compromise cannot be reached a bill dies. </p>
                            </div>
                            <div class="mt-4">
                                <p>The bill is sent to presiding officers (Speaker of the House, President of the
                                    Senate, Lieutenant Governor ect.) to be signed. Enrollment is a final examination to
                                    find any technical erros and verify votes. After it has been enrolled, it will become
                                    law sixty days following the legislative session whether or not the Governor signs
                                    it. </p>
            
                            </div>
                            <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>
                        </div>

                    </div>
                    <div class="tooltip1 mt-4 min-h-[500px] w-full border" v-else-if="selected == 'signed'">
                        <div class="statusTitle"><span>Signed</span></div>
                        <div class="mt-4"><span class="text-lg"> The bill may be signed by the Governor.</span></div>
                        <div class="mt-4">

                            <p>After the bill has been enrolled, it is sent to the Governor for signature. The Governor
                                has
                                20 days to sign the bill, veto it, or allow it to become law without a signature. If the
                                Governor vetoes the bill, it is sent back to the house of origin with the Governor's
                                objections. The bill can be overridden by a two-thirds vote in both houses. If the
                                Governor does not sign the bill, it becomes law without a signature. </p>
                        </div>
                        <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>
                    </div>
                    <div class="tooltip1 mt-4  min-h-[500px] w-full border" v-else-if="selected == 'vetoed'">
                        <div class="statusTitle"><span>Vetoed</span></div>
                        <span class="mt-4 text-lg"> The bill may be vetoed by the Governor.</span>

                        <div class="mt-4">If the governor vetoes a bill before the end of the session, the legislature may override
                            it with a 2/3rds majority in both houses. If the legislative session has already ended, a
                            vote will be taken conducted by the Speaker of the House and President of the Senate to see
                            if they are in favor of reconvening for a maximum of 5 days after a 2/3rds vote. With the
                            bill, no amendents are allowed and legislators must vote yes or no.
                            <br><br>
                            For Appropriation bills (budget bills), the Governor has the power to veto any single item
                            of appropiation while approving other portions of the bill. Though the conditions placed on
                            the appropiations cannot be vetoed. It is the responsibility of the governor and the
                            executive branch to implement the budget in conformance with those conditions.

                        </div>
                        <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>

                    </div>

                    <div class="tooltip1 mt-4 min-h-[500px] w-full border flex flex-col" v-else-if="selected == 'failed'">
                        <div class="statusTitle"><span>Failed</span></div>
                        <div class="mt-4 text-lg"><span> The bill may fail to pass.</span></div>

                        <div class="mt-4">
                            <p>There are many ways a bill can fail to pass. It can be held in committee, tabled, voted
                                down, lack sponsors and other funny ways. If a bill is tabled, it is effectively killed
                                but can be reconsidered at a later time. If a bill is voted down, it can be reintroduced
                                in the next session. With all the moving parts and steps necessary to pass a bill, it's
                                a miracle any get through without awesome bipartisanship or one-party hegemony. </p>
                        </div>
                        <a class="link block mt-6"
                                    href="https://le.utah.gov/lrgc/utahstategovernmentcitizensguide.htm"
                                    target="_blank">(Referenced from the Utah State Government ~ A Citizens Guide).</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
import LegislatorSelector from '../components/LegislatorSelector.vue'
import billSponsorImage from '../assets/icons/billsponsor.png'
import legcomImage from '../assets/icons/selectedtoserve.png'
import * as Icons from '../assets/icons'

let divToMatch = ref(null)
// let divHeight = ref(0)
// let divWidth = ref(0)
let imageUrlBill = billSponsorImage
let imageUrlServe = legcomImage
let showFirst = ref(true)
let showSec = ref(true)
let icons = Icons

let selected = ref('introduced')
let selectLegislator = ref('representative')
let selectedOfficer = computed(() => {
    if (selectLegislator.value == 'representative') {
        return 'Speaker of the House'
    } else if (selectLegislator.value == 'senator') {
        return 'Senate President'
    }
})
let selectedHouse = computed(() => {
    if (selectLegislator.value == 'representative') {
        return 'House of Representatives'
    } else if (selectLegislator.value == 'senator') {
        return 'Senate'
    }
})

function showFirstImage() {
    showFirst.value = !showFirst.value
}
function showSecImage() {
    showSec.value = !showSec.value
}
//tried to get a white frosted look, not just blur but it would not resize the second div when the window changed. 

// watch(divToMatch, (newValue, oldValue) => {
//     if (newValue) {
//         divHeight.value = newValue
//     }
// })
// watchEffect(() => {
//     if(divToMatch.value) {
//     divWidth.value = divToMatch.value.offsetWidth
//     divHeight.value = divToMatch.value.offsetHeight
//     }
// })

// let box  = new ResizeObserver((entries) => {
//     for (let entry of entries) {
//         divWidth.value = entry.contentRect.width
//         divHeight.value = entry.contentRect.height
//     }
// })

// if (divToMatch.value) {
//     box.observe(divToMatch)
// }

// onMounted(() => {
//         divWidth.value = divToMatch.value.offsetWidth
//         divHeight.value = divToMatch.value.offsetHeight
//     box.observe(divToMatch)
// })



</script>



<style scoped>
.hero-text {
    font-size: clamp(7rem, 18vw, 50vw);

}

.hero-sub-text {
    backdrop-filter: blur(5px);
}

.statusButton {
    @apply p-2 my-2 border-2 min-w-32 max-w-32 md:w-[10%] justify-self-center bg-white hover:bg-slate-100 font-bold
}

.link {
    text-decoration: underline;
    @apply hover:text-rose-500
}

.tooltip1 {
    @apply p-7 bg-white
}

.statusTitle {
    @apply text-3xl mb-2
}

.statusImages {
    @apply w-full
}

/* .backgroundBlue {
  background: rgb(2,0,36);
background: linear-gradient(184deg, rgba(2,0,36,1) 0%, rgba(96,96,153,1) 50%, rgba(160,214,225,1) 100%);
} */
</style>