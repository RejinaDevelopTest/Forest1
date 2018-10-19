//
//  SecondViewController.swift
//  Forest1
//
//  Created by 釜谷 on 2018/08/02.
//  Copyright © 2018年 Regina. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class SecondViewController: UIViewController, IndicatorInfoProvider {
    var itemInfo: IndicatorInfo = "Second"

    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return itemInfo
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

    // MARK: - IBAction
    @IBAction func onTest(_ sender: UIButton) {
    
        performSegue(withIdentifier: "showDetail", sender: nil)
    }
}
