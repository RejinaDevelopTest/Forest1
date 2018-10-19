//
//  ArticleTableViewCell.swift
//  Forest1
//
//  Created by 釜谷 on 2018/10/10.
//  Copyright © 2018 Regina. All rights reserved.
//

import UIKit

class ArticleTableViewCell: UITableViewCell {

    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var imageview: UIImageView!
 
    @IBOutlet weak var imageWidth: NSLayoutConstraint!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        

        imageWidth.constant = self.imageview.bounds.height
    }
}
