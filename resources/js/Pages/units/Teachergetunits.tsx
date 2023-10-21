import React, { useEffect} from 'react';
import { Col, Divider, Row} from 'antd';
import { Link, router } from '@inertiajs/react';

import "../../../css/getunits.css"
function Teachergetunits({phases , units}:any) {
    useEffect(()=>{
        console.log(phases)
    } , []);
    const gettitle = (title : string)=>{
        if(title === "T_1"){
            return "اولي ثانوي"
            }else if(title === "T_2"){
            return "ثانية ثانوي"
            }else if(title === "T_3"){
            return "ثالثة ثانوي"
            }else if(title === "C_1"){
            return "اولي كلية"
            }else if(title === "C_2"){
            return "ثانية كلية"
            }else if(title === "C_3"){
            return "ثالثة كلية"
            }else if(title === "C_4"){
            return "رابعة كلية"
            }else if(title === "any"){
            return "بلا تصنيف"
            }
    }

  return (
    <>
    <Divider orientation="center">{gettitle(phases[0].phase)}</Divider>
    <Row gutter={[16, 24]} className='row_grid'>
        {units.map((unit: { id: any | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined; unit: string | undefined; title: string }) =>
            <Col className="gutter-row" span={6} key={unit.id}>
                <Link href={route("show.unit" , unit.id)}>
                    <div className='col_unit'>
                        {unit.title}
                    </div>
                </Link>
            </Col>
            )}
    </Row>
    </>
  )
}

export default Teachergetunits