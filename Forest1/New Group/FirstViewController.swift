//
//  FirstViewController.swift
//  Forest1
//
//  Created by 釜谷 on 2018/08/02.
//  Copyright © 2018年 Regina. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class FirstViewController: UIViewController, IndicatorInfoProvider, UITableViewDelegate, UITableViewDataSource {

    var itemInfo: IndicatorInfo = "First"

    @IBOutlet weak var tableview: UITableView!

    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return itemInfo
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        tableview.delegate = self
        tableview.dataSource = self
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - UITableViewDelegate
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        
        return 100
    }

//    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//        tableView.deselectRow(at: indexPath, animated: true)
//        performSegue(withIdentifier: "PushShopDetail", sender: indexPath)
//    }
    
    // MARK: - UITableViewDataSource
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return 5
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        if indexPath.row == 1 {
            return tableview.dequeueReusableCell(withIdentifier: "testRow", for: indexPath)
        } else {
            return tableview.dequeueReusableCell(withIdentifier: "articleItem", for: indexPath)
        }
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
