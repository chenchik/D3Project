//small amount of jquery for information slider effect
$('.infoButton').on('click', function(e){
	$('#description').slideToggle('fast');
	$('#descriptionTitle').slideUp('fast');
});

var margin = {top: 0, right: 20, bottom: 10, left: 40};
var width = 1150 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var otherHeight = 280;
var bottomSvgTopMargin = 0;

var legendSvg = d3.select('.container').append('svg')
	.attr('class', 'legendSvg')
	.attr('width', width + margin.left + margin.right)
    .attr('height', 50 + margin.top + margin.bottom)
	.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//svg for university info	
var bottomSvg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', otherHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



	
var inStateBoxLabel = legendSvg.append('rect')
		.attr('y', 10)
		.attr('height', 20)
		.attr('x', 10)
		.attr('width', 20)
		.attr('fill', '#cccccc');

var inStateLabel = legendSvg.append('text')
		.attr('class', 'legend')
		.attr("x", 40)
		.attr("y", 30)
		.text( 'In State Revenue (in Millions)')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
var outStateBoxLabel = legendSvg.append('rect')
		.attr('y', 40)
		.attr('height', 20)
		.attr('x', 10)
		.attr('width', 20)
		.attr('fill', '#66cef4');

var outStateLabel = legendSvg.append('text')
		.attr('class', 'legend')
		.attr("x", 40)
		.attr("y", 60)
		.text( 'Out of State Revenue (in Millions)')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");		
			
	
var scaleX = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2);

var scaleY = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .orient('left')
    .ticks(15, '$');
	
//function to add commas to large numbers	
function addCommas(a){
	var temp = a.toString().split('');
	if(temp.length <= 3){
		return temp.join('');
	}
	var i = temp.length - 1;
	var count = 1;
	for(i; i >= 0; i--, count++){
		if(count%3 == 0){
			temp.splice(i, 0, ',');
			i--;	
		}	
	}
	return temp.join('');
	 
}

d3.csv('cleanTuitionWithoutSome.csv', function(err, data) {
    if (err) throw error;
	//global offsets
	var shapesOffset = 40;
	var inOutOffset = 140;
	var topNumOffset = 65;
	var bottomNumOffset = 125;
	var topTitleOffset = 100;
	var offsetForTopTitle = 50;
	var UNCTotalTuition = 367;
	var maxY = 0;
	
    data.forEach(function(d) {
        d.tOutOfState = Number(d.tOutOfState);
		d.tInState = Number(d.tInState);
		d.pOutOfState = Number(d.pOutOfState);
		d.pInState = Number(d.pInState);
		d.rOutOfState = Number(d.rOutOfState);
		d.rInState = Number(d.rInState);
		if(d.rInState + d.rOutOfState > maxY){
			maxY = d.rInState + d.rOutOfState;
		}
    });
	
	/*--- Titles and lables for university information ---*/
	
	var schoolTitle = bottomSvg
		.append('text')
		.attr('class', 'schoolTitle percentText')
		.attr("x", 0)
		.attr("y", bottomSvgTopMargin + offsetForTopTitle)
		.text( 'Hover to select a university.')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#aaaaaa");
	var inState = bottomSvg
		.append('text')
		.attr('class', 'inState percentText')
		.attr("x", 0)
		.attr("y", bottomSvgTopMargin + topNumOffset + topTitleOffset)
		.text( 'In State')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var outOfState = bottomSvg
		.append('text')
		.attr('class', 'outOfState percentText')
		.attr("x", 0)
		.attr("y", bottomSvgTopMargin + bottomNumOffset + topTitleOffset)
		.text( 'Out Of State')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");	
	var inOutTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutTitle percentText titles')
		.attr("x", 330 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 0 + topTitleOffset)
		.text( 'Student Dist.')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutSubTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutSubTitle percentText subtitles')
		.attr("x", 330 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( 'of selected university')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutTuitionTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutTuitionTitle percentText titles')
		.attr("x", 520 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 0 + topTitleOffset)
		.text( 'Tuition Rates')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutTuitionSubTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutTuitionSubTitle percentText subtitles')
		.attr("x", 520 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( 'of selected university')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutRevTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutRevTitle percentText titles')
		.attr("x", 30 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 0 + topTitleOffset)
		.text( 'UNC Revenue Difference')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutRevSubTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutRevSubTitle percentText subtitles')
		.attr("x", 30 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( "with selected university's student dist.")
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inOutRevTitleQuestionMark = bottomSvg	
		.append('image')
		.attr('class', 'inOutRevTitleQuestionMark')
		.attr('xlink:href', 'question.png')
		.attr("x", 0 + inOutOffset)
		.attr("y", bottomSvgTopMargin - 20 + topTitleOffset)
		.attr('width', 25)
		.attr('height', 25)
		.attr('opacity', 0.6)
		.on('mouseover', function(d) {
                d3.select('.tooltip')
                    .html("This section represents tuition revenue <br/> differences for UNC if they were to adpot <br/> the current school's in state/out of state <br/> student distribution. <br/> Calculating this is simply using UNC's student <br/> population and its current tuition rates, but <br/> changing the distribution of in state and <br/>out of state students with regard to the selected <br/>school. ")
					.style('opacity', 1);
            })
            .on('mouseout', function(d) {
                d3.select('.tooltip')
                    .style('opacity', 0);
            })
            .on('mousemove', function(d) {
                d3.select('.tooltip')
                    .style('left', (d3.event.clientX + 20) + 'px')
                    .style('top', (d3.event.clientY + 450) + 'px');
            });
	var inOutPopTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutPopTitle percentText titles')
		.attr("x", 740 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 0 + topTitleOffset)
		.text( 'Student Population')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");	
	var inOutPopSubTitle = bottomSvg
		.append('text')
		.attr('class', 'inOutPopSubTitle percentText subtitles')
		.attr("x", 740 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 20 + topTitleOffset)
		.text( "of selected university.")
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	
	/*--- section for percentage doughtnut chart ---*/
	
	var outOfStatePercent = 100;
	var inStatePercent = 0;
	var fullArc = d3.svg.arc()
		.outerRadius(radius)
		.innerRadius(radius - 20)
		.startAngle(0)
		.endAngle(Math.PI * 2);
	var fullCirlce = bottomSvg.append('circle')
		.attr('class', 'fullCircle')
		.attr("cx",  430 + inOutOffset)
        .attr("cy", bottomSvgTopMargin + 50 + shapesOffset+ topTitleOffset)
        .attr("r", 50)
        .attr('fill', '#cccccc');
	var radius = 50;
	var p = Math.PI * 2;
	var arc = d3.svg.arc()	
		.outerRadius(radius)
		.innerRadius(radius - 20)
		.startAngle(0+(Math.PI/3))
		.endAngle(p+(Math.PI/3));	
	var arcMarginTop = bottomSvgTopMargin + 50 + shapesOffset+ topTitleOffset;
	var arcLeftOffset = 430 + inOutOffset;	
	var leftPointForCircle = margin.left + 110;
	var percentCircle = bottomSvg
		.append("path")
		.attr('class', 'percentCircle')
		.datum({endAngle: .127 * Math.PI * 2})
		.attr('transform', 'translate('+arcLeftOffset+', '+ arcMarginTop +')')
      .attr("d", arc)
      .style("fill", "#66cef4");
	var innerCirlce = bottomSvg.append('circle')
		.attr('class', 'innerCircle')
		.attr("cx", 430 + inOutOffset)
        .attr("cy", bottomSvgTopMargin + 50 + shapesOffset+ topTitleOffset)
        .attr("r", 30)
        .attr('fill', 'white');
	
	/*--- section for student distribution percentage info ---*/
	
	var outOfStatePercentNum = bottomSvg
		.append("text")
		.attr('class', 'outOfStatePercentNum percentText')
		.attr("x", 330 + inOutOffset)
		.attr("y", bottomSvgTopMargin+bottomNumOffset+ topTitleOffset)
		.text( '0%')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inStatePercentNum = bottomSvg
		.append("text")
		.attr('class', 'inStatePercentNum percentText')
		.attr("x", 330 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( '0%')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var tuitionRates = bottomSvg.append('g')
		.attr('class', 'rates');
		
	/*--- section for tuition rates of selected university ---*/
		
	var outOfStateRate = tuitionRates.append('rect')
		.attr('class', 'outOfStateRate')
            .attr('x', 610 + inOutOffset)
            .attr('width', 100)
            .attr('y',  bottomSvgTopMargin + 70 + shapesOffset+ topTitleOffset)
            .attr('height', 20)
            .attr('fill', '#66cef4');
	var inStateRate = tuitionRates.append('rect')
		.attr('class', 'inStateRate')
            .attr('x', 610 + inOutOffset)
            .attr('width', 100)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 20)
            .attr('fill', '#cccccc');
	var otherInfoLine = tuitionRates.append('line')
		.attr('class', 'otherInfoLine')
            .attr('x1', 500 + inOutOffset)
			.attr('x2', 500 +inOutOffset )
            .attr('y1',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
			.attr('y2',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 80)	
            .attr('stroke-width', 1)
            .attr('stroke', '#cccccc');
	var otherInfoText = tuitionRates.append('text')
			.attr('class', 'otherInfoText percentText')
            .attr('x', 500 + inOutOffset)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 120)			
            .text('Other information about selected university')
            .attr("font-family", "sans-serif")
			.attr("font-size", "80px")
			.attr("fill", "#bbbbbb");
	var outOfStateNum = tuitionRates
		.append('text')
		.attr('class', 'outOfStateNum percentText')
		.attr("x", 520 + inOutOffset)
		.attr("y", bottomSvgTopMargin + bottomNumOffset+ topTitleOffset)
		.text( '$00,000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inStateNum = tuitionRates
		.append('text')
		.attr('class', 'inStateNum percentText')
		.attr("x", 520 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( '$00,000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	
	/*--- section for revenues generated for UNC ---*/
	
	var tuitionRevenues = bottomSvg.append('g')
		.attr('class', 'revenues');
		
	var outOfStateRev = tuitionRevenues.append('rect')
		.attr('class', 'outOfStateRev')
            .attr('x', 70 + inOutOffset)
            .attr('width', 20)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 80)
            .attr('fill', '#66cef4');
	var inStateRev = tuitionRevenues.append('rect')
		.attr('class', 'inStateRev')
            .attr('x', 100 + inOutOffset)
            .attr('width', 20)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 80)
            .attr('fill', '#cccccc');
	var totalStateRev = tuitionRevenues.append('rect')
		.attr('class', 'totalStateRev')
            .attr('x', 130 + inOutOffset)
            .attr('width', 20)
            .attr('y',  bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset)
            .attr('height', 0)
            .attr('fill', '#66cef4');
	var totalStateRevNum = tuitionRates
		.append('text')
		.attr('class', 'totalStateRevNum percentText')
		.attr("x", 170 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( 'Total: $000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var diffRevNum = tuitionRates
		.append('text')
		.attr('class', 'diffRevNum percentText')
		.attr("x", 170 + inOutOffset)
		.attr("y", bottomSvgTopMargin + bottomNumOffset+ topTitleOffset)
		.text( 'Gain: $000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var outOfStateRevNum = tuitionRates
		.append('text')
		.attr('class', 'outOfStateRevNum percentText')
		.attr("x", 0 + inOutOffset)
		.attr("y", bottomSvgTopMargin + topNumOffset+ topTitleOffset)
		.text( '$000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
	var inStateRevNum = tuitionRates
		.append('text')
		.attr('class', 'inStateRevNum percentText')
		.attr("x", 0 + inOutOffset)
		.attr("y", bottomSvgTopMargin + bottomNumOffset+ topTitleOffset)
		.text( '$000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#bbbbbb");
		
	/*--- section for student population ---*/	
		
	var studentPop = bottomSvg.append('g')
		.attr('class', 'population');
	var studentPopNum = studentPop
		.append('text')
		.attr('class', 'studentPopNum percentText')
		.attr("x", 740 + inOutOffset)
		.attr("y", bottomSvgTopMargin + 105+ topTitleOffset)
		.text( '00,000')
		.attr("font-family", "sans-serif")
		.attr("font-size", "80px")
		.attr("fill", "#cccccc");

	/*--- main top chart section ---*/
	
    scaleX.domain(data.map(function(d) { return d.university }));
	scaleY.domain([0, maxY]);
	
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
		.attr('fill', '#aaaaaa')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
		.attr('fill', '#aaaaaa')
        .call(yAxis);
	
	/*--- section for hovering over particular sections of chart and displaying information ---*/
	
	var barGroups = svg.selectAll('.bars')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'barGroups')
		.on('mouseover', function(d) {
			console.log("this is the d:  " + d);
			var inState = 0;
			var outOfState = 0;
			var inStateT = 0;
			var outOfStateT = 0;
			var totalT = 0;
			var maxT = 0;
			var inStateR = 0;
			var outOfStateR = 0;
			var totalR = 0;
			var studentPop = 0;
			var univ = '';
			
			//wouldn't let me select d[info] directly for some reason
			for(var i in d){
				console.log("i is : " + i + " d[i] is: "+ d[i]);
				if(i == "pInState"){
					inState = d[i];
				}
				else if(i == 'tInState'){
					inStateT = d[i];
				}
				else if(i == 'tOutOfState'){
					outOfStateT = d[i];
				}
				else if(i == 'rInState'){
					inStateR = d[i];
				}
				else if(i == 'rOutOfState'){
					outOfStateR = d[i];
				}
				else if(i == 'studentPop'){
					studentPop = d[i];
				}
				else if(i == 'university'){
					univ = d[i];
				}
				
			}
			outOfState = 100 - inState; 
			totalR = inStateR + outOfStateR;
			totalT = inStateT + outOfStateT;
			maxT = (inStateT > outOfStateT) ? inStateT : outOfStateT;
			p = (inState/100)*Math.PI*2
			
			//update percentage circle
		
			arc = d3.svg.arc()
				.outerRadius(radius)
				.innerRadius(radius - 20)
				.startAngle(0-(Math.PI/2))
				.endAngle(p-(Math.PI/2));
			d3.select('.percentCircle')			
				.attr("d", arc);
			
			//update all other information when hovering over university
		
			d3.select('.inStatePercentNum')
				.text( inState+'%');
			d3.select('.outOfStatePercentNum')
				.text( (100-inState)+'%');
			d3.select('.outOfStateRate')
				.attr('width',(outOfStateT/totalT)*110 );
			d3.select('.inStateRate')
				.attr('width',(inStateT/totalT)*110 );
			d3.select('.outOfStateNum')
				.text('$'+addCommas(outOfStateT));
			d3.select('.inStateNum')
				.text('$'+addCommas(inStateT));
			d3.select('.inStateRev')
				.attr('height', (inStateR/totalR)*80)
				.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + (80-((inStateR/totalR)*80)));
			d3.select('.outOfStateRev')
				.attr('height', (outOfStateR/totalR)*80)
				.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + (80-((outOfStateR/totalR)*80)));	
			if(totalR < UNCTotalTuition){
				var diff = (((UNCTotalTuition-totalR)/UNCTotalTuition)* 40);
				d3.select('.totalStateRev')
					d3.select('.totalStateRev')
					.attr('height', diff)
					.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 80 - diff)
					.attr('fill', '#f45d5d');
				d3.select('.diffRevNum')
					.text('Loss: $'+addCommas(UNCTotalTuition-totalR))
					.attr('fill', '#f45d5d');
			}else{
				var diff = (((totalR-UNCTotalTuition)/UNCTotalTuition)* 40);
				d3.select('.totalStateRev')
					.attr('height', diff)
					.attr('y', bottomSvgTopMargin + 10 + shapesOffset+ topTitleOffset + 80 - diff)
					.attr('fill', '#73ea59');
				d3.select('.diffRevNum')
					.text('Gain: $'+addCommas(totalR-UNCTotalTuition))
					.attr('fill', '#73ea59');
			}
			d3.select('.totalStateRevNum')
				.text('Total: $'+addCommas(totalR));	
			d3.select('.inStateRevNum')
				.text('$'+addCommas(inStateR));
			d3.select('.outOfStateRevNum')
				.text('$'+addCommas(outOfStateR));
			d3.select('.studentPopNum')
				.text(addCommas(studentPop));
			d3.select('.schoolTitle')
				.text(univ);
		});
	
	/*--- section for displaying stacked columns of potential revenue ---*/
		
    barGroups.selectAll('.rOutOfState')
        .data(function(d){return [d];})
        .enter()
        .append('rect')
            .attr('class', 'pOutOfState bar')
            .attr('x', function(d) { return scaleX(d.university); })
            .attr('width', scaleX.rangeBand())
            .attr('y', function(d) { return height - d.rOutOfState; })
            .attr('height', function(d) { return d.rOutOfState; })
            .attr('fill', '#66cef4');
			
	barGroups.selectAll('.pInState')
        .data(function(d){return [d];})
        .enter()
        .append('rect')
            .attr('class', 'pInState bar')
            .attr('x', function(d) { return scaleX(d.university); })
            .attr('width', scaleX.rangeBand())
            .attr('y', function(d) { 
			return height - d.rOutOfState - d.rInState - 5; })
			.attr('height', function(d){return d.rInState;})
            .attr('fill', '#CCCCCC');
});
