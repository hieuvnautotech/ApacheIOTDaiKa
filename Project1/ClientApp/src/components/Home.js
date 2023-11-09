import React, { Component } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';




export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {  // Constructor
        
        super(props);
        this.state = { sensors: [], loading: true };
        this.COLUMNS = [
            {
                label: 'Datetime', renderCell: (item) =>
                    item.created_date,
            },
            { label: 'PH', renderCell: (item) => item.ph },
            { label: 'Temperature', renderCell: (item) => item.temperture },

        ];
      
    }

    componentDidMount() {
        this.populateData();
    }


    async populateData(keyword, value_search) {
        keyword = keyword === undefined || keyword == "" ? null : keyword


        var url = "sensor"
        if (keyword !== undefined && keyword != "") {
            url += '?keyword=' + keyword
            if (value_search !== undefined && value_search != "")
                url += '&value_search=' + value_search

        }

        else {
            if (value_search !== undefined && value_search != "")
                url += '?value_search=' + value_search
        }




        this.setState({ loading: true });
        const response = await fetch( url );
        const data = await response.json();

        console.log(data)
        this.setState({ sensors: data, loading: false });
    }

    handleSearch() {

        this.populateData(this.state.keyword, this.state.value_search)
    }

    handleSearchInput(e) {
        this.setState({keyword:e.target.value  })
    }

    handleValueInput(e) {
        this.setState({ value_search: e.target.value })
    }



  render() {
      return (
          <>
              <div style={{ float: 'right' }}>
                  <input type="number" style={{ marginRight:'15px' }} placeholder="value >" value={this.state.value_search} onChange={this.handleValueInput.bind(this)} />
                  <input type="text" placeholder="sensor name" value={this.state.keyword} onChange={this.handleSearchInput.bind(this)} /> <button onClick={this.handleSearch.bind(this)}>Search</button>

              </div>
             
              {this.state.loading?<p>Loading...</p>: <CompactTable columns={this.COLUMNS} data={{ nodes: this.state.sensors }} />}
        </>
       
    );
  }
}
