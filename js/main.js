(function () {
    window.onload = function () {       

        $(".table-wrapper").mCustomScrollbar();
        $(".tab-content-wrapper").mCustomScrollbar();
        $(".last-table-wrapper").mCustomScrollbar();

        var tab1 = $('.tab1'),
            tab2 = $('.tab2'),
            tab3 = $('.tab3'),
            tab4 = $('.tab4'),
            content1 = $('.content1'),
            content2 = $('.content2'),
            content3 = $('.content3');
            content4 = $('.content4');

        tab1.on('click', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            content1.addClass('active');
            content1.siblings().removeClass('active');
        });

        tab2.on('click', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            content2.addClass('active');
            content2.siblings().removeClass('active');
        });

        tab3.on('click', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            content3.addClass('active');
            content3.siblings().removeClass('active');
        });

        tab4.on('click', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            content4.addClass('active');
            content4.siblings().removeClass('active');
        });
    }
})();


let resultBlock = 0;
let ticketVal = 0;
let getPrizeBlock = 0;
let blocks;
let site_url = 'https://g.btc36.com/';
let etherscan_api_url ='https://api.bscscan.com/';
let etherscan_url ='https://bscscan.com/';

let rates = {};
rates[10] = 1.5; //a
rates[11] = 1.5; //b
rates[12] = 1.5; //c

rates[13] = 2.0; //d
rates[14] = 2.0; //e

rates[15] = 3.0; //f

rates[153] = 'JACKPOT'; //99

function hexdec(hexString) {
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '')
    return parseInt(hexString, 16)
}

function setResultBlock(blockNumber, val){
    resultBlock = blockNumber;
    ticketVal = val;
}

$(document).ready(function () {
    let arr = location.pathname.split('/');
    if (arr[1] == 'ref') {
        localStorage.setItem('referrer', arr[2]);
    }

    let referrer = localStorage.getItem('referrer');

    if(referrer == null) {
        referrer = '0x0000000000000000000000000000000000000000';
    }

    function clearLog() {
        $('#fail').hide();
        $('#won-area').hide();

        $('#log1').hide();
        $('#log2').hide();
        $('#log3').hide();
        $('#getPrize').hide();

        $('#waitPrize').show();
    };

    let abi = [{"constant":true,"inputs":[],"name":"maxWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"prizePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"depositWeis","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_minWei","type":"uint256"},{"name":"_maxWei","type":"uint256"},{"name":"_divider","type":"uint256"}],"name":"changeTicketWeiLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawRefsPercent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allTicketsPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dividendManagerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userRefs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"winBlocks","outputs":[{"name":"exists","type":"bool"},{"name":"lastByte","type":"uint8"},{"name":"rate","type":"uint8"},{"name":"jp","type":"bool"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownersPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"refPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownersWeis","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allTicketsForBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxWeiPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"refs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"returnDeposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dividendManagerAddress","type":"address"}],"name":"setDividendManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"devWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"getPrize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"JPBlocks","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"changeWeiPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_wallet1","type":"address"},{"name":"_wallet2","type":"address"},{"name":"_wallet3","type":"address"}],"name":"setOwnerWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"minJackpotValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastPayout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerWallet1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerWallet3","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"addWinBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addEth","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"transferEthersToDividendManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"tickets","outputs":[{"name":"value","type":"uint256"},{"name":"executed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"},{"name":"_ticketPrice","type":"uint256"}],"name":"jackpotValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ref","type":"address"},{"name":"value","type":"uint256"}],"name":"play","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"blocks","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"admin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ownerWallet2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"blockNum","type":"uint256"},{"indexed":true,"name":"referrer","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"NewTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minWei","type":"uint256"},{"indexed":false,"name":"maxWei","type":"uint256"}],"name":"NewPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newWeiPerBlock","type":"uint256"}],"name":"NewWeiPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"blockNum","type":"uint256"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SendPrize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"dividendManager","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"FundsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"blockNum","type":"uint256"}],"name":"WinBlockAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
    let address = '0xaf99e3D4812dF7aF00064f9d517B5837D9B9963B';
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);
    let contract = new ethers.Contract(address, abi, provider.getSigner());

    let infuraProvider = ethers.getDefaultProvider('homestead');
    let contractWithoutWeb3 = new ethers.Contract(address, abi, infuraProvider);



    ///refs
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    let userAddress = '0x0';

    function setUserAddress(addr) {
        userAddress = addr;
    }


    window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable();
                listAccs();
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // window.web3 = new Web3(web3.currentProvider);
            listAccs();
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    });


    function listAccs() {
        provider.listAccounts().then(function(accounts) {

            if (typeof accounts[0] !== 'undefined') {
                $("#ownRefLink").html(site_url+'?'+accounts[0])

                contract.refs(accounts[0]).then(function(value) {
                    let val = ethers.utils.formatEther(value.toString());
                    $('#refBalance').html(val);
                    // if (val > 0) {
                    //     $("#withdrawRefs").removeAttr('disabled');
                    // }
                });

                myTickets(accounts[0]);
                setUserAddress(accounts[0]);
            }
        });
    }


    $("#ownRefLink").click(function (event) {
        event.preventDefault();
        CopyToClipboard($("#ownRefLink").html(), true, "Value copied");
    });

    $("#withdrawRefs").click(function (event) {
        event.preventDefault();
        contract.withdrawRefsPercent().then(tx=> {
            console.log('withdrawRefs', tx)

            provider.waitForTransaction(tx.hash).then(tx=> {
                $('#refBalance').html(0);
                // $("withdrawRefs").prop('disabled', true);
            })
        })
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function myTickets(user) {
        user = "0x000000000000000000000000"+user.substr(2,40);
        let blockNumber = await provider.getBlockNumber();
        let data = await $.getJSON(etherscan_api_url+"api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+address+"&topic0=0x5452a85b225ef4259cf69950e73ab227ccafb86408af83a1dafbee4abd7f5a60&topic0_1_opr=and&topic1="+user+"&apikey=JCIF14J2V7WSKUCA1YU81GGHT7WCWCNMQM");
        data = data['result'];

        $("#myTickets").empty();
        $("#myTickets").append("<tr><th>交易</th><th>开奖区块</th><th>彩票价值</th></tr>");

        let index;

        for (index = data.length - 1; index >= 0; --index) {
            let bNum = hexdec(data[index]['blockNumber']);
            let txHash = data[index]['transactionHash'];
            let value = (hexdec(data[index]['data']));

            let res;
            if (bNum+1 > blockNumber - 256 && bNum+1 <= blockNumber) {
                let block = await provider.getBlock(bNum+1);
                res = hexdec(block.hash.substr(64, 2));
            }

            let btn = '<td></td>';
            if (typeof rates[res % 16] !== 'undefined' || typeof rates[res] !== 'undefined') {
                btn = '<td class="text-center"><a href="" class="link getPrize" b="'+(bNum+1)+'">领奖</a></td>';
            };

            $("#myTickets").append("<tr><td><a href='"+etherscan_url+"/tx/"+txHash+"' target='_blank' class='link'>Bscscan</a></td><td><a href='https://bscscan.com/block/"+(bNum+1)+"' target='_blank' class='link'>"+(bNum+1)+"</a></td><td>"+value+"</td>"+btn+"</tr>");


        }

    }

    ///Transactions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let lastTxBlock = 0;

    function setLastTxBlock(n) {
        lastTxBlock = ++n;
    }

    function getTransactions() {
        $.getJSON(etherscan_api_url+"api?module=logs&action=getLogs&fromBlock="+lastTxBlock+"&toBlock=latest&address="+address+"&apikey=JCIF14J2V7WSKUCA1YU81GGHT7WCWCNMQM", function( data ) {

            let addWinBlock = "0xcc1325d9dce0926e1a052173c628a244b156c438edbcdff68251760607d5a905";
            let getPrize = "0x6770b7080a2fdf538ff535ceb0b3ccb507cb803153c3d85f1e35f78178e8c8eb";
            let newTicket = "0x5452a85b225ef4259cf69950e73ab227ccafb86408af83a1dafbee4abd7f5a60";
            let arr = data['result'];
            let index;
            for (index = 0; index < arr.length; ++index) {
                let bNum = hexdec(arr[index]['blockNumber']);
                setLastTxBlock(bNum);
                let txHash = arr[index]['transactionHash']

                let str = '';
                let cl = '';

                if (arr[index]['topics'][0] == getPrize) {
                    let priz = (hexdec(arr[index]['data']));
                    let winner = arr[index]['topics'][1];
                    str = "奖金 " + priz + " UAT 发放给 0x" + winner.substr(26,40)
                    //arr[index]['topics'][2]//win block
                    //cl = "bg-win";
                }

                if (arr[index]['topics'][0] == newTicket) {
                    let val = (hexdec(arr[index]['data']));
                    let from = arr[index]['topics'][1];
                    str = "购买新彩票 0x" + from.substr(26,40) + " 花费 " + val + "UAT";
                    //arr[index]['topics'][2] //ticket block
                    //arr[index]['topics'][3] //refferer
                    //cl = "bg-newticket";
                }

                if (str.length > 0) {
                    $("#transactions").prepend("<div class='ticket-item' id='"+bNum+"'>"+str+"</div>");
                    $("#"+bNum).fadeIn(1000);
                }

            }
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function updateTransactions() {
        while (true) {
            await sleep(5000);
            getTransactions();
        }
    }

    updateTransactions();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function updateJackpot() {
        $.getJSON(etherscan_api_url+"api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address="+address+"&topic0=0x5452a85b225ef4259cf69950e73ab227ccafb86408af83a1dafbee4abd7f5a60&apikey=JCIF14J2V7WSKUCA1YU81GGHT7WCWCNMQM", function( data ) {
            let blockNumber = hexdec(data.result[data.result.length-1].blockNumber);
            let v = $('#buy-ticket').val();
            console.log(v);
            contractWithoutWeb3.jackpotValue(blockNumber, ethers.utils.parseEther(v)).then(function(value) {
                let val = ethers.utils.formatEther(value.toString());
                $('#jackpot').html(Number(val).toFixed(3));
            });
        });
    }

    updateJackpot();


    $('#buyTicket').on('click', function(e) {
        e.preventDefault();
        let v = $('#buy-ticket').val();

        clearLog();

        let overrideOptions = {
            value: ethers.utils.parseEther(v)
        };

        $('#log1').show();
        contract.play(referrer, Number(v)).then(tx=> {

            tx.wait().then(tx=> {
                $('#resLink').html(tx.blockNumber+1);
                $('#resLink').attr('href', etherscan_url+"block/"+(tx.blockNumber+1));
                $('#log2').show();

                setResultBlock(tx.blockNumber+1, v);
                updateJackpot();
                myTickets(userAddress);
            })
        })
    });


    provider.on('block', function(blockNumber) {
        //console.log('New Block: ' + blockNumber);

        if (blockNumber == resultBlock) {
            provider.getBlock(blockNumber).then(function(block) {
                console.log(block.hash);
                $('#resHash').html(block.hash);
                $('#log3').show();
                let res = hexdec(block.hash.substr(64,2));

                if (typeof rates[res % 16] !== 'undefined' || typeof rates[res] !== 'undefined') {
                    let rate = 0;
                    let winval = 0;
                    getPrizeBlock = resultBlock + 6;

                    if (typeof rates[res % 16] !== 'undefined') {
                        rate = rates[res % 16];
                        winval = ticketVal * rate;
                    } else {
                        rate = rates[res];
                        winval = $('#jackpot').html();
                    }

                    $('#winval').html(winval);
                    $('#won-area').show();
                    console.log(rate);
                } else  {
                    $('#fail').show();
                }

            });
        }

        if (blockNumber == getPrizeBlock)  {
            $('#getPrize').show();
            $('#waitPrize').hide();
        }

        if (getPrizeBlock > 0 && getPrizeBlock >= blockNumber)  {
            $('#blocksLeft').html(getPrizeBlock - blockNumber);
        }
    });


    $('#getPrize').on('click', function(e) {
        e.preventDefault();

        contract.getPrize(resultBlock).then(tx=> {
        })
    });


    $('#myTickets').on('click', 'a.getPrize', function(e) {
        e.preventDefault();

        contract.getPrize($(this).attr('b')).then(tx=> {

        })
    });

    $('#getPrizeManual').on('click', function(e) {
        e.preventDefault();
        let val = $("#blockNum").val();
        contract.getPrize(val).then(tx=> {
        })
    });

    $("input[name='buy-ticket']").TouchSpin({
            min: 10,
            max: 1000,
            step: 10,
            decimals: 3,
            boostat: 5,
            maxboostedstep: 10,
            callback_after_calculation: function(value) {
              updateJackpot();
              return value;
            }
        });
});

function CopyToClipboard(value, showNotification, notificationText) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("copy");
    $temp.remove();

    if (typeof showNotification === 'undefined') {
        showNotification = true;
    }
    if (typeof notificationText === 'undefined') {
        notificationText = "Copied to clipboard";
    }

    var notificationTag = $("div.copy-notification");
    if (showNotification && notificationTag.length == 0) {
        // $('#copypopover').popover('show');
        // setTimeout(function () {
        //     $('#copypopover').popover('hide');
        // }, 1500);
    }
}