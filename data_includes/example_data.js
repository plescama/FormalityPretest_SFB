function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string" );
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
}
function pick(set, n) { return new Pick(set,n); }



PennController.AddHost("https://amor.cms.hu-berlin.de/~plescaan/Master/")  //change Host
PennController.ResetPrefix(null);
//PennController.DebugOff() // use for the final version
var progressBarText = "Fortschritt"; //Changes the text of the progress bar
PennController.Sequence( "welcome",
                         "demographics",
                         "instructions",
                         "practice", "end_practice",
                         pick(list = randomize("experiment_trial"),10), "attentionCheck1",
                         pick(list, 10), "break",
                         pick(list, 10),"attentionCheck2", 
                         pick(list, 10),
                         "post-ques", "send", "final");



//*********************************************************************************************************************************************************************************************
// INTRO
//********************************************************************************************************************************************************************************************

PennController("welcome",
               
        fullscreen()
        ,
        defaultText
            .print()
        ,       
        newText("text2", "<p>Humboldt Universit&auml;t zu Berlin, Institut f&uuml;r Deutsche Sprache und Linguistik </p>")
        .settings.center()
        .settings.css("font-style","italic")
       
        ,
        newText("text1", "<h2>Willkommen und Danke, dass Du Dir die Zeit nimmst, an unserem Experiment teilzunehmen!</h2>")
        .settings.center()
        .settings.css("font-size", "large")

        ,
        newText("browser_info", "<br> Bitte stelle sicher, dass Du das Experiment <b>nur mit Mozilla Firefox oder Google Chrome</b> durchf&uuml;hrst.")
        .settings.css("font-size", "large")
       .settings.center()
        ,
        newText("bi", "Versuche bitte <b>nicht</b>, das Experiment auf dem Tablet oder auf dem Mobiltelefon auszuf&uuml;hren, sondern nur am Laptop oder PC.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi2", "Stelle au&szlig;erdem sicher, dass Dein Browserfenster im Vollbildmodus ist.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi3", "W&auml;hle einen bequemen und ruhigen Platz f&uuml;r die n&auml;chsten 20 Minuten! Vielen Dank!")
        .settings.center()
        .settings.css("font-size", "large")
        ,        
                
        newText("br", "<br>")
        .print()
        ,        
        newButton("button1", "Start")
            .settings.center()
            .print()
            .wait()
        ,
        getText("text1")
            .remove()
       
        ,
        getText("browser_info")
        .remove()
        ,
        getText("text2")
        .remove()
        ,
        getText("bi")
        .remove()
        ,
         getText("bi2")
        .remove()
        ,
        getText("bi3")
        .remove()
        ,
        getText("br")
        .remove()
        ,       
        getButton("button1")
          .remove()
        ,
         newHtml("consentInfo", "consentInfo.html")
          .settings.center()
           .print()
          .checkboxWarning("Bitte die Checkbox abhaken um fortzufahren!")
        ,
         newButton("button2", "Fortsetzen")
         .settings.center()
         .print()
          .wait(
           getHtml("consentInfo").test.complete()
           .failure(getHtml("consentInfo").warn())
               )      
        ,
        getHtml("consentInfo")
        .remove()
        ,
        getButton("button2")
        .remove()
        ,
        fullscreen() 
             
               
)

.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);


//// DEMOGRAPHICS ==============================================================
PennController("demographics",
        
               
        newText("demo", "<b>Personenbezogene Daten</b> <p>Wir brauchen einige Angaben zu Deiner Person. Diese werden anonymisiert gespeichert und eine spätere Zuordnung zu Dir wird nicht möglich sein. Bitte nimm Dir beim Ausfüllen der Felder Zeit. Scrolle bitte nach unten um alle Fragen zu beantworten<p>")              
        .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
        //.settings.italic()

               ,
                  
               newCanvas("democanvas", 1000,120)
               .settings.add(20,0, getText("demo"))
               //.settings.center()
               .print()
               ,
               newDropDown("age", "Bitte eine Option ausw&auml;hlen")
               .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "über 31")
               .settings.log()
               
               ,
               newText("agetext", "1. Alter:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newCanvas("agecanvas", 1000, 40)
               .settings.add(20,0,getText("agetext"))
               .settings.add(450,2, getDropDown("age"))
               //.settings.center()
               .print()
               ,
               newText("sex", "2. Geschlecht:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Weiblich", "M&auml;nnlich", "Divers")
               .settings.log()
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(20, 0, getText("sex"))
               .settings.add(450,3, getDropDown("sex"))
               //.settings.center()
               .print()
               ,
               newText("german", "3. Ist Deutsch Deine Muttersprache?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("german", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               ,
               newCanvas("germancanvas", 1000, 40)
               .settings.add(20, 0, getText("german"))
               .settings.add(450,3, getDropDown("german"))
               //.settings.center()
               .print()
               ,
               newText("bilingual", "<b>4. Bist Du bilingual aufgewachsen (hast Du vor Deinem 6. Lebensjahr eine andere Sprache als Deutsch gelernt)?</b><br><small>(Falls Du Ja ausgewählt hast, schreibe bitte auf, mit welcher (welchen) anderen Sprache(n) Du aufgewachsen bist)</small><br><br>")
               .settings.css("font-size", "18px")
               
               , 
               newTextInput("bilingualinput", "")
               .settings.size(150,40)
               .settings.log()
               .settings.hidden()
               ,
               newText("bilingual_input", "")
               .settings.after(getTextInput("bilingualinput"))
               ,
               newDropDown("bilingual",  "<br>" +"Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               .settings.after(getText("bilingual_input"))
               .settings.callback(
                   getDropDown("bilingual")
                   .test.selected("Ja")
                   .success(getTextInput("bilingualinput").settings.visible(
                    
                   )) )
               ,
               newCanvas("bilingual", 1000, 40)
               .settings.add(20, 0, getText("bilingual"))
               .settings.add(870,3, getDropDown("bilingual"))
               //.settings.center()
               .print()
               ,
               newCanvas("filler", 1, 20)
               
               .print()
               ,
               newText("abschluss", "5. <b>Was ist Dein h&ouml;chster Bildungsabschluss:</b><br><small>(Falls Du Sonstige ausgewählt hast, schreibe bitte auf, welche Dein h&ouml;chster Bildungsabschluss ist)</small><br><br>")
               .settings.css("font-size", "18px")
               
               , 
               newTextInput("abschlussinput", "")
               .settings.size(150,40)
               .settings.log()
               .settings.hidden()
               ,
               newText("abschluss_input", "")
               .settings.after(getTextInput("abschlussinput"))
               ,
               newDropDown("abschluss", "Bitte eine Option ausw&auml;hlen")
               .settings.add("kein Abschluss","Schulabschluss","Abitur oder gleichwertiger Abschluss","Bachelor","Master", "Promotion", "Ausbildung", "Sonstige")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
               //.settings.size(191,20)
               .settings.log()
               .settings.after(getTextInput("abschlussinput")) //
               .settings.callback(
                   getDropDown("abschluss")
                   .test.selected("Sonstige")
                   .success(getTextInput("abschlussinput").settings.visible(
                   
                   )) )
               ,
               newCanvas("abschlusscanvas", 1000, 40)
               .settings.add(20, 0, getText("abschluss"))
               .settings.add(870,3, getDropDown("abschluss"))
               //.settings.center()
               .print()
               ,
               
               newCanvas("filler", 1, 20)
               .print()
              //location of error ,
              ,
               newText("Leiter","<b>6.</b> Stell Dir vor, <b>die untenstehende Leiter</b> repr&auml;sentiert den relativen Sozialstatus der Menschen in Deutschland. "
                       +"An der Spitze der Leiter stehen Menschen mit relativ hohem Status – diejenigen, die das meiste Geld, die beste Bildung und die angesehensten Arbeitspl&auml;tze haben. Ganz unten sind Menschen mit relativ niedrigem Status – beispielsweise als arbeitslos Gemeldete. Relativ weit unten zu verorten w&auml;ren auch diejenigen, die nur wenig Geld verdienen, einen niedrigen Bildungstand haben, und / oder Berufe aus&uuml;ben, die die Gesellschaft als eher wenig respektabel ansieht."
                       +"<br> Wo w&uuml;rdest Du Dich auf dieser Leiter einordnen? W&auml;hle bitte die Sprosse, die Deinem empfundenen Sozialstatus am ehesten entspricht.")
               .settings.css("font-size", "18px")
               ,
               newDropDown("leiter", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A", "B", "C","D", "E", "F","G", "H", "I","J")
               .settings.log()
               ,
               newImage("leiter", "https://amor.cms.hu-berlin.de/~patarroa/Leiter.jpeg")
               .settings.size(200,300)
               ,
               newCanvas("leitercanvas", 1000,20)
               .settings.add(20, 10, getText("Leiter"))
               //.settings.center()
               .print()
               ,
               newCanvas("leitercanvas2", 1000,350)
               .settings.add(350,150, getImage("leiter"))
               .settings.add(650,300, getDropDown("leiter"))
               //.settings.center()
               .print()
               ,
               newText("degeboren", "7. Bist Du in Deutschland geboren?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("degeboren", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               //.settings.size(200,40)
               ,
               newCanvas("degeboren", 1000,190)
               .settings.add(20, 170, getText("degeboren"))
               .settings.add(400,170,getDropDown("degeboren"))
               //.settings.center()
               .print()
               ,
               newText("native", "<b>8. Wie wurde bei Dir zuhause gesprochen?</b><br><small>(Falls Du A, D, F oder G ausgewählt hast, schreibe bitte auf, mit welchen Dialekten Du aufgewachsen bist)</small>")
               .settings.css("font-size","18px")
         
               ,
               newTextInput("native_dialekt", "")
               .settings.size(200,30)
               .settings.log()
               .settings.hidden()
               ,
               newText("native_dialekt_input", "")
               .settings.after(getTextInput("native_dialekt"))
               ,
               newDropDown("language", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A. Dialekt", "B. Umgangssprache", "C. Gepflegtes Hochdeutsch", "D. Alle", "E. B und C", "F. A und C", "G. A und B")
               //.settings.size(200,40)
               .settings.log()
               .settings.after(getText("native_dialekt_input"))
               .settings.callback(
                   getDropDown("language")
                   .test.selected("A. Dialekt")
                   .success(getTextInput("native_dialekt").settings.visible())
                   //    .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("B. Umgangssprache")
                   .success(getTextInput("native_dialekt").settings.hidden())
                   
                   .test.selected("C. Gepflegtes Hochdeutsch")
                   .success(getTextInput("native_dialekt").settings.hidden())
               
                   .test.selected("D. Alle")
                   .success(getTextInput("native_dialekt").settings.visible())
                   //      .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("E. B und C")
                   .success(getTextInput("native_dialekt").settings.hidden())
                   
                   .test.selected("F. A und C")
                   .success(getTextInput("native_dialekt").settings.visible())
                   // .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("G. A und B")
                   .success( getTextInput("native_dialekt").settings.visible())
                   //  .failure(getTextInput("dialekt").settings.hidden())
                   )
        
               ,
               newCanvas("languagecanvas", 1000,75)
              .settings.add(20, 40, getText("native"))
              .settings.add(680,40, getDropDown("language"))
              //.settings.center()
              .print()
               
               ,
               newText("current", "<b>9. Wie sprichst Du aktuell haupts&auml;chlich?</b><br><small>(Falls Du A, D, F oder G ausgewählt hast, schreibe bitte auf, welche Dialekte Du verwendest)</small>")
               .settings.css("font-size", "18px")

               ,
               newTextInput("current_dialekt", "")
               .settings.log()
               .settings.size(200,30)
               .settings.hidden()
               ,
               newText("current_dialekt_input", "")
               .settings.after(getTextInput("current_dialekt"))
               ,
               newDropDown("current_dial", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A. Dialekt", "B. Umgangssprache", "C. Gepflegtes Hochdeutsch", "D. Alle", "E. B und C", "F. A und C", "G. A und B")
               .settings.log()
               //.settings.size(200,40)
               .settings.after(getText("current_dialekt_input"))
               .settings.callback(
                   
                   getDropDown("current_dial")
                   .test.selected("A. Dialekt")
                   .success(getTextInput("current_dialekt").settings.visible())
                  
                  
                   .test.selected("B. Umgangssprache")
                   .success(getTextInput("current_dialekt").settings.hidden())
                   
                   .test.selected("C. Gepflegtes Hochdeutsch")
                   .success(getTextInput("current_dialekt").settings.hidden())
              
                   .test.selected("D. Alle")
                   .success(getTextInput("current_dialekt").settings.visible())
                 
                   
                   .test.selected("E. B und C")
                   .success(getTextInput("current_dialekt").settings.hidden())
                   
                   .test.selected("F. A und C")
                   .success(getTextInput("current_dialekt").settings.visible())
                  
                   
                   .test.selected("G. A und B")
                   .success( getTextInput("current_dialekt").settings.visible())
                   

               )
               ,
               newCanvas("current_dialekt_canvas", 1000, 75)
               .settings.add(20, 40, getText("current"))
               .settings.add(680,40, getDropDown("current_dial"))
               //.settings.center()
               .print()   
               ,
               newText("dialectcomp", "<b>10. Wenn Du einen Dialekt sprichst, wie gut kannst Du ihn sprechen/verstehen?</b><br><small>(Skala von 0 - 'gar nicht' bis 100 'ausgezeichnet')</small>")
               .settings.css("font-size", "18px")
               ,
               newTextInput("dial_comp", "")
               .log()
               .size(200, 40)
               .print()
               ,
               newCanvas("dial_comp_canv", 1000, 75)
               .settings.add(20, 40, getText("dialectcomp"))
               .settings.add(680,30, getTextInput("dial_comp"))
               //.settings.center()
               .print()   
               ,
               newText("hochsprcomp", "<b>11. Wie gut sprichst und verstehst Du Hochdeutsch?</b><br><small>(Skala von 0 - 'gar nicht' bis 100 'ausgezeichnet')</small>")
               .settings.css("font-size", "18px")
               ,
               newTextInput("hoch_comp", "")
               .settings.log()
               .lines(0)
               .size(200, 40)
               .print()
               ,
               newCanvas("hoch_comp_canv", 1000, 75)
               .settings.add(20, 40, getText("hochsprcomp"))
               .settings.add(680,30, getTextInput("hoch_comp"))
               //.settings.center()
               .print()   
               ,        
               newCanvas("filler2", 1, 40)
               .print()
               ,
               
    newButton("continue", "Weiter")
               .settings.css("font-family", "calibri").settings.css("font-size", "18px")
               //.settings.center()
               .settings.log()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
            .and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "Bitte gib Dein Alter an.").color("red").print() )
            // sex
            ).and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "Bitte gib Dein Geschlecht an.").color("red").print() )
            // german
            ).and( getDropDown("german").test.selected()
                    .failure( newText('errorgerman', "Bitte gib Informationen &uuml;ber Deine Muttersprache an.").color("red").print() )
            // bilingual
            ) .and( getDropDown("bilingual").test.selected()
                    .failure( newText('errorbilingual', "Bitte gib an, ob Du bilingual oder monolingual aufgewachsen bist.").color("red").print() )
            // language
            ).and( getDropDown("language").test.selected()
                    .failure( newText('langerror', "Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds.").color("red").print() )
            // current dialect
            ).and( getDropDown("current_dial").test.selected()
                    .failure( newText('dialecterr', "Bitte antworte auf die Frage bez&uuml;glich der von Dir aktuell verwendeten Sprache.").color("red").print() )
            // abschluss
            ).and( getDropDown("abschluss").test.selected()
                   .failure( newText('abschlusserr', "Bitte antworte auf die Frage bez&uuml;glich Deines Abschlusses.").color("red").print() )
            ).and(getDropDown("leiter").test.selected()
                   .failure( newText('leitererr', "Bitte gib eine Variante auf der Leiter an.").color("red").print() )
            ).and(getDropDown("degeboren").test.selected()
                    .failure( newText('degeborenerr', "Bitte gib an, wo Du geboren wurdest.").color("red").print() )
            ).and(
              getTextInput("native_dialekt").test.printed()
               .success(getTextInput("native_dialekt")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("dialekterr","Bitte gib Informationen &uuml;ber die Sprachform mit der Du aufgewachsen bist an.")
                             .settings.color("red")
                             .print() )
                ) //end success
            ).and(
             getTextInput("current_dialekt").test.printed()
              .success(getTextInput("current_dialekt")
              .test.text(/^.*/)  // testing if at 0 or more words were written in the input box
              .failure(
                   newText("dialekterr1","Bitte gib Informationen &uuml;ber Deinen aktuellen Sprachgebrauch an.")
                   .settings.color("red")
                   .print())
            ) //success
            ).and(
             getTextInput("hoch_comp").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("dialekterr2","Bitte gib Informationen &uuml;ber Deine Hochsprach-Kompetenz an.")
                   .settings.color("red")
                   .print())
            ).and(
            getTextInput("dial_comp").test.text(/^.+/) // testing if at least one digit was written in the input box
                   .failure(
                   newText("dialekterr3","Bitte gib Informationen &uuml;ber Deine Dialekt-Kompetenz an.")
                   .settings.color("red")
                   .print())
            ) )
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getDropDown("current_dial").wait("first")
               ,
               getDropDown("leiter").wait("first")
               ,
               getDropDown("abschluss").wait("first")
               ,
               getDropDown("degeboren").wait("first")
               ,
               getButton("continue")
               .remove()
               ,
               newText("<p>")
               .print()                               
)

.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);




//*******************************************************************************************************************************************************************
// HOW TO BEHAVE & INSTRUCTIONS
//******************************************************************************************************************************************
PennController("instructions",
               
        fullscreen()
        ,

        newText("intro", "Vielen Dank f&uuml;r Deine Teilnahme an diesem Experiment! Das folgende Experiment besteht aus 3 Teilen: einer kurzen &Uuml;bungsrunde, dem tats&auml;chlichen Experiment und einem Post-Experiment Fragebogen. Insgesamt wird es ca. 20 Minuten in Anspruch nehmen.")
        .settings.css("font-size", "20px")
        ,
               
        newText("Remember", "Bitte denke daran, dass Du dieses Experiment <b>nur auf Deinem PC/Laptop mit Mozilla Firefox oder Google Chrome durchf&uuml;hren kannst</b>. Dein Fenster sollte im <b>Vollbildmodus</b> sein.<br> <br> Dr&uuml;cke die <b>Leertaste um fortzufahren</b>...")
        .settings.css("font-size", "20px")     
        ,
        newCanvas("introc", 900, 450)
        .settings.add(40,0, getText("intro"))
        .settings.add(40,120, getText("Remember"))
        .settings.center()
        .print()
        
        ,        
        newKey("intro", " ")
        .wait()
        ,
        getCanvas("introc")
        .remove()
        ,
        newText("precau", "<p>Weil <b>dies ein Experiment ist,</b> w&uuml;rden wir es sehr sch&auml;tzen, wenn Du die folgenden Schritte befolgen k&ouml;nntest, um Deine Konzentration zu gew&auml;hrleisten: <p><t>&nbsp;&nbsp;&nbsp;&bull; <b>schalte jegliche Musik/Audio aus</b>, die Du vielleicht h&ouml;rst<p>&nbsp;&nbsp;&nbsp;&bull; <b>verzichte darauf, w&auml;hrend des Experiments zu chatten</B> oder jegliche andere Handlungen au&szlig;er des Experiments vorzunehmen<p><t>&nbsp;&nbsp;&nbsp;&bull; stell Dein <b>Handy auf lautlos</b> und lass es mit dem Screen nach unten oder au&szlig;er Reichweite liegen<p><t>&nbsp;&nbsp;&nbsp;&bull; k&uuml;mmere Dich um das Experiment, bis es vorbei ist (es gibt kurze Pausen)<p><t>&nbsp;&nbsp;&nbsp;&bull; verhalte Dich generell so, als w&auml;rst Du in unserem Labor! <p>Diese Schritte werden dazu beitragen, dass die Daten, die wir von dir sammeln, von hoher Qualit&auml;t sind. Bitte <b>dr&uuml;cke die Leertaste</b>, wenn Du diesen Schritten zustimmst.")
        .settings.css("font-size", "20px")
        ,
        newCanvas("preccanvas",900, 450)
        .settings.add(20,0, getText("precau"))
        .settings.center()        
        .print()   
        ,
        newKey("set-up"," ")
        .wait()
        ,     
        getCanvas("preccanvas")
        .remove()
        ,
        newText("instructions_a", "<b>Deine Aufgaben w&auml;hrend des Experiments:</b><p>"
                        + "In diesem Experiment wirst du S&auml;tze &uuml;ber Menschen, Ereignisse und Berufe lesen. Jede Darstellung eines Ereignisses, die Du lesen wirst, besteht aus zwei kurzen <b>S&auml;tzen</b> und zusammen bilden diese einen Zusammenhang."
                        +" Deine Aufgabe ist es, jeden Satz einzeln, sorgf&auml;ltig und aufmerksam zu lesen und ganz am Ende die Formalit&auml; des gesamten Zusammenhanges nach Gef&uuml;hl und ohne viel nachzudenken zu bewerten."
                        + "Als formal k&ouml;nnte man einen Satz bewerten, der im gepflegten Hochdeutsch formuliert ist. Zum Beispiel, wenn man bei einem &Auml;rtzekongress spricht, dann benutzt man formelle Sprache."
                        + "Als informel k&ouml;nnte man einen Satz bewerten, der eher in Umgangssprache formuliert ist. Solche Sprache w&uuml;rde man in Umgang mit Freunden benutzen."
    
                        +"<p>(1) <b>Als erstes siehst Du den ersten Kontextsatz.</b> Lies ihn sorgf&auml;ltig durch und klicke auf die <b> Leertaste </b> um den n&auml;chsten Kontextsatz zu enth&uuml;llen."
                       )
                .settings.css("font-size", "20px")
               .settings.center()
        ,

     
         newText("instructions_b",  "(2) <b>Sobald Du auf die Leertaste erneut geklickt hast, wird der Kontextsatz verschwinden und Du wirst den letzten Satz sehen.</b><br>"
                 +" Lies ihn sorgf&auml;ltig durch und klicke auf die <b> Leertaste </b> um die Bewertungsskala f&uuml;r Formalit&auml;t des gesamten Zusammenhanges zu enth&uuml;llen."
                       )
                .settings.css("font-size", "20px")
               .settings.center()
        ,
               
        newText("context1", "e.g, <i>'Ganz vorsichtig ausgedr&uuml;ckt, &auml;u&szlig;erte Petra ihre Meinung.'</i>")
        .settings.css("font-size", "18px")
        .settings.css("font-family","courier")
   
        ,
        newText("context2", "e.g, <i>'Ich finde, der Croissaint schmeckt k&ouml;stlich.'</i>")
        .settings.css("font-size", "18px")
        .settings.css("font-family","courier")
        ,
        newCanvas("instruccanvas",1300, 500)
        .settings.add(40,0, getText("instructions_a"))  // added first set of instructions
        .settings.add(30,280, getText("context1"))      // added the first context sentence
        .settings.center()
        .print()
        ,
        newKey("con"," ")
        .wait()
        ,
        getCanvas("instruccanvas")
        .remove( getText("context1"))  //removed 1st sentence
        .remove( getText("instructions_a")) //removes 1st instructions
        ,
        getCanvas("instruccanvas")
        .settings.add(40,150, getText("instructions_b"))  //added the second set of instructions
        .settings.add(30,280, getText("context2"))      //added the second context sentence
        .settings.center()
        .print()
        ,
        newKey("con1"," ")
        .wait()
        
        ,
        getCanvas("instruccanvas")
        .remove( getText("context2"))   //removed 2nd sentence
        .remove( getText("instructions_b"))//removes 2nd instructions
       
       ,

      newText("instructions_d", "(3) Es ist besonders wichtig, dass Du die S&auml;tze aufmerksam liest und versuchst, Dir deren Inhalt zu merken. Am Ende jedes Satzpaares wirst Du eine Bewertungsskala sehen.<p><b>Bitte bewerte nach deiner Intuition, wie formell oder informell der letzte Satz ist.</b>"
                           )
                 .settings.css("font-size", "20px")
                 .settings.center()
                 .print()
            
       ,      
      newScale("comprehensibility_intr", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
      .settings.css("font-family", "times new roman").settings.css("font-size", "12px")
      .settings.before(newText("comp", "formell")
                        .settings.css("font-family", "times new roman").settings.css("font-size", "18px").settings.css("width", "5em", "text-align", "right"))
      .settings.after(newText("incom", "  "+"informell")
                      .settings.css("font-family", "times new roman").settings.css("font-size", "18px").settings.css("width", "8em", "text-align", "right"))
      .labelsPosition("under")
      .settings.size(1200)
      .settings.labelsPosition("bottom")
      .settings.center()
      .settings.log("last")
      ,
     
 //   newCanvas("emptycan", 1,50)
   // .print()
    //  , 
    
     newText("instructions_e", "<i>Klicke auf die Leertaste um die &Uuml;bungsrunde zu starten</i>")
     .settings.css("font-size", "20px")
     .settings.center()
    
        , 
        
        getCanvas("instruccanvas")
        .settings.add(40,10, getText("instructions_d"))   //added the second set of instructions
        .settings.add(30,150, getScale("comprehensibility_intr"))       //added the second context sentence
        .settings.add(40,250, getText("instructions_e"))
        .settings.center()
        .print()
        ,
        newKey("con3"," ")
        .wait()
       ,
        getCanvas("instruccanvas")
       .remove( getScale("comprehensibility_intr"))  //removed 1st sentence
       .remove( getText("instructions_d")) //removes 1st instructions
       .remove( getText("instructions_e"))
        
        );

//************************************************************
// PRACTICE TRIALS
//************************************************************
PennController.Template( PennController.GetTable("list1_pretest.csv")
                         .filter("itemType" , "practice")
                         ,
                         variable => ["practice",
                                      
                                      "PennController", PennController(
                                       fullscreen()
                                       ,
                                       defaultText
                                       .settings.css("font-family","courier")
                                       ,   
                                       //CONTEXT SENTENCE 1
                                       // dots
                                       newText("start", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start")
                                       .remove()
                                       ,
                                       // context sentence
                                       newText ("read_ctxt","<i>Lies bitte den Kontextsatz durch. Wenn Du fertig bist, dr&uuml;cke auf die Leertaste um den n&auml;chsten Satz zu enth&uuml;llen</i>")
                                      .settings.css("font-size", "18px")
                                      .settings.center()
                                      .settings.css("font-family","times-new")
                                      .settings.color("red")
                                      .print(50,200)
                                      ,
                                      newText("ctxt", variable.context_norm) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                     
                                      ,
                                      newKey("after_ctxt1", " ")
                                      .wait()
                                      .log()
                                      ,
                                      getText("read_ctxt")
                                      .remove()
                                      ,
                                      getText("ctxt")
                                      .remove()
                                      ,
                                    
                                      
                                      //TARGET SENTENCE
                                      // dots
                                       newText("start3", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start3")
                                       .remove()
                                       ,
                                       // context sentence
                                       newText ("read_ctxt3","<i>Lies bitte den Kontextsatz aufmerksam durch. Wenn Du fertig bist, dr&uuml;cke auf die Leertaste um die Bewertungsskala zu enth&uuml;llen</i>")
                                      .settings.css("font-size", "18px")
                                      .settings.center()
                                      .settings.css("font-family","times-new")
                                      .settings.color("red")
                                      .print(50,200)
                                      ,
                                      newText("ctxt3", variable.target_norm)
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      ,
                                      newKey("after_ctxt2", " ")
                                      .wait()
                                      .log()
                                      ,
                                      getText("read_ctxt3")
                                      .remove()
                                      ,
                                      getText("ctxt3")
                                      .remove()
                                      ,
                                      newText("<br><br><br><b>Wie formell (hochsprachlich) / informell (umgangssprachlich) sch&auml;tzt du den letzten Satz ein?</b><br><br>")
                                      .settings.css("font-size", "20px").settings.css("font-family","times-new")
                                      .settings.center()
                                      .print()
                                    //  .print(375,250)
                                       ,
                                        newText("labels","<p>0 = sehr umgangssprachlich | 50= sehr hochsprachlich<p>")  
                                          .settings.css("font-family","times new roman") .settings.css("font-size", "15px")
                                          .settings.center()
                                          .settings.italic()
                                          .print()
                                          
                                          
                                       ,   
                                       newText ("choose","<i>Bewerte bitte die Verst&auml;ndlichkeit der zuvor gelesenen Geschichte mittels der Bewertungsskala. Wenn Du fertig bist, validiere deine Antwort um fortzufahren.</i><br><br>")
                                      .settings.css("font-size", "16px")
                                      .settings.css("font-family","times-new")
                                      .settings.color("red")
                                      .settings.center()
                                      .print()
                                    //  .print(220,320)
                                      ,
                                      newScale("comprehensibility_prac", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
                                          .settings.css("font-family", "times new roman").settings.css("font-size", "13px")
                                          .settings.before( newText("incomp", "nicht<br>verst&auml;ndlich")
                                                            .settings.css("font-family", "times new roman").settings.css("font-size", "14px").settings.css("width", "5em"))
                                          .settings.after(newText("comp", "gut <br>verst&auml;ndlich")
                                                          .settings.css("font-family", "times new roman").settings.css("font-size", "14px").settings.css("width", "5em"))
                                          .settings.size(1150)
                                          .settings.labelsPosition("bottom")
                                          .settings.center()
                                          .print()
                                          .settings.log("last")
                                          
                                      //.print(280,320)
                                     // .print(280,380)
                                      ,
                                      newCanvas ("filler1", 1,25)
                                      .print()
                                      ,
                                      
                                      newButton("validation", "Best&auml;tigen")
                                      .settings.center()
                                      //.print(715,420)
                                      .print()
                                      .wait( getScale("comprehensibility_prac").test.selected()
                                                                              .failure(
                                                                                newText("timedout","<b>Bitte bewerte die S&auml;tze anhand der Bewertungsskala!</b>")
                                                                                 .settings.css("font-size", "19px")
                                                                                 .settings.css("font-family","times-new")
                                                                                 .settings.color("red")
                                                                                 .settings.center()
                                                                                 .print()
   
                                                                                  
                                                                              ) )
                                      
                                      
                                      
                                      
                                      
                                      )
                                      .log("item_id", variable.item_id)
                                      .log("context_sentence", variable.context_norm)
                                      .log("target_sentence", variable.target_norm)
                                      .log("register", variable.target_context)

                                     ]

                        );


//**********************************************************************
// EXPERIMENTAL TRIALS
//**********************************************************************

PennController.Template( PennController.GetTable("list1_pretest.csv")
                         //.filter("itemType" , (/^(critical|filler)$/))
                         ,
                         variable => ["experiment_trial",
                                      
                                      "PennController", PennController(
                                       fullscreen()
                                       ,
                                       defaultText
                                       .settings.css("font-family","courier")
                                       ,   
                                       //CONTEXT SENTENCE 1
                                       // dots
                                       newText("start", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start")
                                       .remove()
                                       ,
                                       
                                      newText("ctxt", variable.context_norm) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                     
                                      ,
                                      newKey("after_ctxt1", " ")
                                      .wait()
                                      .log()
                                      
                                      ,
                                      getText("ctxt")
                                      .remove()
                                      ,
                          
                                      //TARGET SENTENCE
                                      // dots
                                       newText("start3", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start3")
                                       .remove()
                                       
                                      ,
                                      newText("ctxt3", variable.target_norm)
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      ,
                                      newKey("after_ctxt2", " ")
                                      .wait()
                                      .log()
                                      
                                      ,
                                      getText("ctxt3")
                                      .remove()
                                      ,
                                     
                                     
                                      newText("<br><br><br><b>Wie formell (hochsprachlich) / informell (umgangssprachlich) sch&auml;tzt du den letzten Satz ein?</b><br><br>")
                                      .settings.css("font-size", "20px").settings.css("font-family","times-new")
                                      .settings.center()
                                      .print()
                                    //  .print(375,250)
                                       ,
                                        newText("labels","<p>0 = sehr umgangssprachlich | 50= sehr hochsprachlich<p>")  
                                          .settings.css("font-family","times new roman") .settings.css("font-size", "15px")
                                          .settings.center()
                                          .settings.italic()
                                          .print()
                                          
                                        ,
                                        newScale("comprehensibility_1", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
                                          .settings.css("font-family", "times new roman").settings.css("font-size", "14px")
                                          .settings.before( newText("incomp", "formell")
                                                            .settings.css("font-family", "times new roman").settings.css("font-size", "14px").settings.css("width", "5em"))
                                          .settings.after(newText("comp", "informell")
                                                          .settings.css("font-family", "times new roman").settings.css("font-size", "14px").settings.css("width", "5em"))
                                          .settings.size(1150)
                                          .settings.labelsPosition("bottom")
                                          .settings.center()
                                          .print()
                                          .settings.log("last")
                                     
                                      ,
                                      newCanvas ("filler1", 1,30)
                                      .print()
                                      ,
                                      newButton("validation", "Best&auml;tigen")
                                      .settings.center()
                                      .print()
                                      //.print(715,420)
                                      .wait( getScale("comprehensibility_1").test.selected()
                                                                              .failure(
                                                                                newText("timedout","<br><br><br><b>Bitte bewerte die S&auml;tze anhand der Bewertungsskala!</b>")
                                                                                 .settings.css("font-size", "19px")
                                                                                 .settings.css("font-family","times-new")
                                                                                 .settings.color("red")
                                                                                 .settings.center()
                                                                                 .print()
                                                                                 //.print(480,470)
                                                                                 
  
                                                                                  
                                                                              ) )
                                      
                                      
                                      
                                      
                                      
                                      )
                                      .log("item_id", variable.item_id)
                                      .log("context_sentence", variable.context_norm)
                                      .log("target_sentence", variable.target_norm)
                                      .log("register", variable.target_context)

                                     ]

                        );


//*******************************************************************************************************************************************************************
// END of PRACTICE
//******************************************************************************************************************************************
PennController( "end_practice" ,
                 
                newText("end_practice", "<p> <i>Das ist das Ende der &Uuml;bungsphase! Das Experiment beginnt, sobald Du die Leertaste dr&uuml;ckst!</i> </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                         .settings.center()
                         .print()

                ,
                
                newKey("end_pract", " ")
                .wait()
                .log()
                ,  
               
                getText("end_practice")
                .remove()
                ,
                newTimer(3000)
                .start()
                .wait()
                          
               )   
    
 

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// TAKE A BREAK
//******************************************************************************************************************************************
PennController( "break" ,
                
               
                newText("break_text", "<p><b>Zeit f&uuml;r die letzte Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen.Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                 newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,

                getKey("continue_exp")
                .remove()   
                ,
                newText("continue_exp_final", "<br><br><br><br>Dr&uuml;cke die <b>Leertaste</b> noch einmal, um das Experiment zu starten."
                       )
               .settings.css("font-size", "25px")
               .settings.center()
               .print()  
              
                ,
                newKey("end_break", " ")
                .wait()
                .log()              
                ,
                getText("continue_exp_final")
                .remove()
                ,
                newTimer(3000)
                .start()
                .wait()                   
               )   
    
    .log("type", "break")
    

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);





//*******************************************************************************************************************************************************************
// End of Experiment
//******************************************************************************************************************************************
PennController( "end_exp" ,
                 newText("end_exp","<p> Das ist das Ende der Experimentphase! Als n&auml;chstes kommt einen kurzen Post-Experiment Fragebogen. </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                         .settings.center()
                         .print()

                ,
                
                newKey("end_exp", " ")
                .wait()
                .log()
                ,  
                
                getText("end_exp")
                .remove()
                           
               )   
    
 

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//*******************************************************************************************************************************************************************
// POST EXPERIMENT QUESTIONNAIRE
//******************************************************************************************************************************************

PennController("post-ques",
               newText("post-instruc", "Wir m&ouml;chten Dich darum bitten, noch ein paar Fragen zum Experiment zu beantworten. <br>Deine Antworten sollten kurz, aber informativ sein.<p><p>")
               .settings.center()
               .settings.bold()
               .print()
               ,
               // Q1
               newText("notice", "1. Gibt es etwas, das Dir w&auml;hrend des Experimentes aufgefallen ist? (Irgendwelche Muster/Regelm&auml;&szlig;igkeiten/etwas Seltsames oder &Uuml;berraschendes)")
               .settings.center()
               .print()
              
               ,
               newTextInput("notice")
               .size(600,50)
               .settings.center()
               .print()
               .log()
               ,
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,
               newButton("next1", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next1")
               .remove()
               ,
               // Q2
               newText("about", "2. K&ouml;nntest Du erraten, worum es bei dem Experiment ging?")
               .settings.center()
               .print()
               ,
               newTextInput("about")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,            
               newButton("next2", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next2")
               .remove()
               ,
               //Q3
               newText("hard", "3. Gab es etwas besonders Schwieriges an dem Experiment?")
               .settings.center()
               .print()
               ,
               newTextInput("hard","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,     
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next3", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next3")
               .remove()
               ,
               // Q4
               newText("strategy", "4. Hast Du w&auml;hrend des Experiments irgendwelche Strategien entwickelt? Wenn ja, bitte erl&auml;utern.")
               .settings.center()
               .print()
               ,
               newTextInput("strategy","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,              
               newButton("next4", "Fertig!")
               .settings.center()
               .print()
               .wait()
               ,
               // create Vars
               newVar("notice") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("notice") )
               ,
               newVar("about") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("about") )
               ,
               newVar("hard") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("hard") )
               ,
               newVar("strategy") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("strategy") )
 
              )
//************************************************************************************** 
// ATTENTIONCHECKS   as adapted from Kathy's script
//**************************************************************************************
    
    
//  Attentioncheck 1
PennController("attentionCheck1",
    newText("attentionCheck1", "Bitte w&auml;hle auf der untenstehenden Skala die Nummer 15 aus:")
    .settings.center()
    .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
    .print()
   
     ,
    
    newCanvas("empty canvas", 1, 30)
          .print()
    ,
               
newScale("attentionslider1","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
.settings.center()
.settings.size (1100)
.settings.labelsPosition("bottom")
.print()
.settings.log()
.wait()
    , 

newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newButton("okay", "Best&auml;tigen")
        .settings.css("font-family", "times-new").settings.css("font-size", "14px")
        .settings.center()
        .print()
        .wait()
        .remove()
    ,
   
    getText("attentionCheck1")
        .remove()
    ,   
    getScale("attentionslider1")
        .remove()
    
    );


// Attentioncheck 2
PennController("attentionCheck2",
    newText("attentionCheck2", "Bitte w&auml;hle auf der untenstehenden Skala die Nummer 35 aus:")
    .settings.center()
    .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
    .print()
   
     ,
    
    newCanvas("empty canvas", 1, 30)
          .print()
    ,
               
newScale("attentionslider2", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
.settings.center()
.settings.size (1100)
.settings.labelsPosition("bottom")
.print()
.settings.log()
.wait()
    , 

newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newButton("okay", "Best&auml;tigen")
        .settings.css("font-family", "times-new").settings.css("font-size", "14px")
        .settings.center()
        .print()
        .wait()
        .remove()
    ,
   
    getText("attentionCheck2")
        .remove()
    ,   
    getScale("attentionslider2")
        .remove()
    
    );
//*******************************************************************************************************************************************************************
// SEND THE RESULTS TO THE SERVER
//******************************************************************************************************************************************
                            
    PennController.SendResults( "send" ); // send results to the server before participants see the actual end of the experiment
                            
                            
//*******************************************************************************************************************************************************************
// THKS & BYE
//*******************************************************************************************************************************************************************                      
                            
  PennController.Template(PennController.GetTable( "validation.csv")// change this line for the appropriate experimental list
                          ,
                         variable => PennController( "final"
                         ,
                         
                         newText("<p> Das ist das Ende des Experimentes. Vielen Dank f&uuml;r Deine Teilnahme! </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p>Bitte kopiere den Code und gib ihn in dem Clickworker-Formular ein, um Deine Teilnahme zu best&auml;tigen und die Bezahlung zu erhalten. </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p>Wichtig: Behandle diesen Code vertraulich und gib ihn nicht an eine andere Person weiter! </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p><b>"+variable.val_code+"</b></p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "30px")
                         .settings.center()
                         .print()
                         ,
                         
        
                        newButton("void")
                         .wait()                            
                                                  
                         )   
                        .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                        .setOption("hideProgressBar", true)
                            );

