'use client'
import firebaseConfig from "@/components/FirebaseConfig/FirebaseConfig"
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";

const database = firebaseConfig();
const dbref = ref(database);

const UserName = "email-user0";


function addHashBetweenInputs(inputs: string[]): string {
    const allEmpty = inputs.every(input => input === '');
    if (allEmpty) {
        return '';
    }
    // Join all inputs with '#'
    return inputs.join('#');
}
function deHash(input: string) {
    // Split the string by '#'
    return input.split('#');
}

function FirebaseCrud() {

    let [ExpCounter, setExpCounter] = useState<string>('Exp_0')
    let [ProjCounter, setProjCounter] = useState<string>('Proj_0')
    let [AchCounter, setAchCounter] = useState<string>('Ach_0')
    const incrementCounter = (counter: string) => {
        const data = counter.split('_')
        const count = parseInt(data[1]);
        const newcounter = `${data[0]}_${count + 1}`;
        return newcounter;
    };

    let [UserName, setUserName] = useState<string>("");
    let [ResumeName, setResumeName] = useState<string>("");

    let [OrgName, setOrgName] = useState<string>('')
    let [ExpTitle, setExpTitle] = useState<string>('')
    let [ExpRole, setExpRole] = useState<string>('')
    let [Description, setDescription] = useState<string>('')
    let [ExpLocation, setExpLocation] = useState<string>('')
    let [ExpStartDate, setExpStartDate] = useState<string>('')
    let [ExpEndDate, setExpEndDate] = useState<string>('')

    let [PTitle, setPTitle] = useState<string>('')
    let [PRole, setPRole] = useState<string>('')
    let [PDescription, setPDescription] = useState<string>('')
    let [PExpLocation, setPExpLocation] = useState<string>('')
    let [PStartDate, setPStartDate] = useState<string>('')
    let [PEndDate, setPEndDate] = useState<string>('')

    let [ProggLang, setProggLang] = useState<string>('')
    let [Tools, setTools] = useState<string>('')
    let [Lang, setLang] = useState<string>('')
    let [more_info, setmore_info] = useState<string>('')

    let [AchExpTitle, setAchExpTitle] = useState<string>('')
    let [AchInfo, setAchInfo] = useState<string>('')

    const isNullorWhiteSpaces = (value: any) => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }

    let InsertData = async () => {

        let inputStrings = [OrgName, ExpTitle, ExpRole, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PExpLocation, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchExpTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/" + UserName + ResumeName))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    alert('Resume Data Exists, Please Select Update')
                    SelectData();
                }
                else {
                    console.log("user-data/" + UserName + "/" + ResumeName)
                    set(ref(database, "user-data/" + UserName + "/" + ResumeName), {
                        Experiences: {
                            [ExpCounter]: hashedExp
                        },
                        Projects: {
                            [ProjCounter]: hashedProj
                        },
                        SkillsInfo: hashedSkill,
                        Achievements: {
                            [AchCounter]: hashedAch
                        },
                    })
                        .then(() => {
                            alert("Resume Data Created")
                        })
                        .catch(error => {
                            console.log(error);
                            alert("error in inserting userData");
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    let SelectData = () => {
        if (isNullorWhiteSpaces(UserName)) {
            alert("Please enter UserName");
            return;
        }

        get(child(dbref, "user-data/" + UserName + "/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                let splittedData = snapshot.val().Experiences.Exp_0.split("#");
                setOrgName(splittedData[0]);
                setExpTitle(splittedData[1]);
                setExpRole(splittedData[2]);
                setDescription(splittedData[3]);
                setExpLocation(splittedData[4]);
                setExpStartDate(splittedData[5]);
                setExpEndDate(splittedData[6]);
                splittedData = snapshot.val().Projects.Proj_0.split("#");
                setPTitle(splittedData[0])
                setPRole(splittedData[1])
                setPDescription(splittedData[2])
                setPExpLocation(splittedData[3])
                setPStartDate(splittedData[4])
                setPEndDate(splittedData[5])
                splittedData = snapshot.val().SkillsInfo.split("#");
                setProggLang(splittedData[0]);
                setTools(splittedData[1]);
                setLang(splittedData[2]);
                setmore_info(splittedData[3]);
                splittedData = snapshot.val().Achievements.Ach_0.split("#");
                setAchExpTitle(splittedData[0]);
                setAchInfo(splittedData[1]);
            }
            else {
                alert("no data available")
            }
        })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    let UpdateData = () => {
        if (isNullorWhiteSpaces(UserName)) {
            alert("UserName is empty try to select UserName first with the select button");
            return;
        }

        let inputStrings = [OrgName, ExpTitle, ExpRole, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PExpLocation, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchExpTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/" + UserName)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, "user-data/" + UserName + "/" + ResumeName), {
                    Experiences: {
                        [ExpCounter]: hashedExp
                    },
                    Projects: {
                        [ProjCounter]: hashedProj
                    },
                    SkillsInfo: hashedSkill,
                    Achievements: {
                        [AchCounter]: hashedAch
                    },
                }).then(() => {
                    alert("user updated")
                })
                    .catch(error => {
                        console.log(error);
                        alert("error in updating customer");
                    });
            }
            else {

                alert('user doesn not exist')
            }
        })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    let DeleteData = () => {
        if (isNullorWhiteSpaces(UserName)) {
            alert("UserName is empty to delete");
            return;
        }

        get(child(dbref, "user-data/" + UserName + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, "user-data/" + UserName + ResumeName))
                    .then(() => {
                        alert("user deleted")
                    })
                    .catch(error => {
                        console.log(error);
                        alert("error in deleting customer");
                    });
            }
            else {

                alert('user doesn not exist')
            }
        })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }
}
